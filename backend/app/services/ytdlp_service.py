import hashlib
import re
import yt_dlp
import httpx
from typing import Any, Optional
from app.schemas.responses import VideoFormat, ResolveResponse
from app.utils.platform_detector import detect_platform
from app.services.cache_service import cache_service
import structlog

logger = structlog.get_logger()

CACHE_TTL = 600  # 10 minutes
FREE_MAX_HEIGHT = 720

ERROR_MAP: dict[str, str] = {
    "Private video": "This content is private and cannot be accessed without authorisation. Cliplane only supports publicly available content.",
    "Sign in": "This content requires a login to access. Cliplane only supports publicly available content.",
    "age-restricted": "This content is age-restricted and cannot be downloaded.",
    "not available": "This video is not available. It may have been deleted or made private.",
    "not found": "Video not found. Please check the URL and try again.",
    "HTTP Error 403": "Access denied. This content may be protected or region-restricted.",
    "HTTP Error 404": "Video not found. The URL may be incorrect or the content may have been deleted.",
    "Unsupported URL": "This URL is not supported by Cliplane.",
    "Account authentication is required": "Reddit now requires account login to access videos. Try a direct video link or use a different platform.",
    "IP address is blocked": "This platform is temporarily blocking downloads from our servers. Please try again later or use a different URL.",
}


def _map_error(error_str: str) -> str:
    for key, msg in ERROR_MAP.items():
        if key.lower() in error_str.lower():
            return msg
    return "Failed to fetch video information. Please check the URL and try again."


def _quality_label(fmt: dict[str, Any]) -> str:
    height: Optional[int] = fmt.get("height")
    if height:
        return f"{height}p"
    abr: Optional[float] = fmt.get("abr")
    if abr:
        return f"{int(abr)}kbps"
    return fmt.get("format_note") or fmt.get("ext") or "Unknown"


def _extract_formats(info: dict[str, Any]) -> list[VideoFormat]:
    raw_formats: list[dict[str, Any]] = info.get("formats") or []
    seen_qualities: set[str] = set()
    formats: list[VideoFormat] = []

    # Sort by height descending (best quality first)
    video_fmts = sorted(
        [f for f in raw_formats if f.get("vcodec") not in (None, "none") and f.get("url")],
        key=lambda x: (x.get("height") or 0),
        reverse=True,
    )

    for fmt in video_fmts:
        quality = _quality_label(fmt)
        if quality in seen_qualities:
            continue
        seen_qualities.add(quality)
        formats.append(
            VideoFormat(
                quality=quality,
                size=fmt.get("filesize") or fmt.get("filesize_approx"),
                format_id=fmt.get("format_id", ""),
                url=fmt.get("url", ""),
                ext=fmt.get("ext", "mp4"),
                has_audio=fmt.get("acodec") not in (None, "none"),
                is_video=True,
                fps=fmt.get("fps"),
                vcodec=fmt.get("vcodec"),
                acodec=fmt.get("acodec"),
            )
        )

    # Add audio-only format if available
    audio_fmts = sorted(
        [f for f in raw_formats if f.get("vcodec") in (None, "none") and f.get("url") and f.get("acodec") not in (None, "none")],
        key=lambda x: (x.get("abr") or 0),
        reverse=True,
    )
    if audio_fmts:
        af = audio_fmts[0]
        formats.append(
            VideoFormat(
                quality="Audio only",
                size=af.get("filesize") or af.get("filesize_approx"),
                format_id=af.get("format_id", ""),
                url=af.get("url", ""),
                ext=af.get("ext", "m4a"),
                has_audio=True,
                is_video=False,
                fps=None,
                vcodec=None,
                acodec=af.get("acodec"),
            )
        )

    return formats[:10]  # cap at 10 options


def filter_formats_for_free(response: ResolveResponse) -> ResolveResponse:
    """Remove audio-only formats and anything above 720p for free users."""
    filtered = []
    for fmt in response.formats:
        if not fmt.is_video:
            continue
        if fmt.quality.endswith("p"):
            try:
                if int(fmt.quality[:-1]) > FREE_MAX_HEIGHT:
                    continue
            except ValueError:
                pass
        filtered.append(fmt)
    return response.model_copy(update={"formats": filtered})


async def _resolve_reddit(url: str) -> ResolveResponse:
    """Use Reddit's public JSON API — no auth needed for public posts."""
    match = re.search(r'reddit\.com/r/([^/]+)/comments/([a-z0-9]+)', url, re.IGNORECASE)
    if not match:
        raise ValueError("Invalid Reddit URL format")

    subreddit, post_id = match.groups()
    api_url = f"https://www.reddit.com/r/{subreddit}/comments/{post_id}/.json"

    async with httpx.AsyncClient(follow_redirects=True, timeout=20) as client:
        resp = await client.get(api_url, headers={"User-Agent": "Mozilla/5.0 Cliplane/1.0"})
        resp.raise_for_status()
        data = resp.json()

    post = data[0]["data"]["children"][0]["data"]
    media = post.get("media") or post.get("secure_media")

    if not media or "reddit_video" not in media:
        raise ValueError("No downloadable video found in this Reddit post. It may be a link or image post.")

    rv = media["reddit_video"]
    fallback_url: str = rv.get("fallback_url", "")
    if not fallback_url:
        raise ValueError("Reddit video URL not available")

    height: int = rv.get("height") or 720
    width: int = rv.get("width") or 1280

    formats: list[VideoFormat] = []
    # Build multiple quality options from fallback URL pattern (DASH segments)
    base_url = re.sub(r'DASH_\d+\.mp4.*', '', fallback_url)
    for h in [1080, 720, 480, 360, 240]:
        if h <= height:
            formats.append(VideoFormat(
                quality=f"{h}p",
                size=None,
                format_id=f"reddit_{h}",
                url=f"{base_url}DASH_{h}.mp4",
                ext="mp4",
                has_audio=False,
                is_video=True,
                fps=rv.get("bitrate_kbps"),
                vcodec="avc1",
                acodec=None,
            ))

    if not formats:
        formats.append(VideoFormat(
            quality=f"{height}p",
            size=None,
            format_id="reddit_video",
            url=fallback_url,
            ext="mp4",
            has_audio=False,
            is_video=True,
            fps=None,
            vcodec="avc1",
            acodec=None,
        ))

    thumbnail = post.get("thumbnail") or ""
    if thumbnail in ("self", "default", "nsfw", ""):
        thumbnail = None  # type: ignore[assignment]

    return ResolveResponse(
        title=post.get("title") or "Reddit Video",
        thumbnail=thumbnail,
        duration=rv.get("duration"),
        author=post.get("author"),
        platform="reddit",
        formats=formats,
    )


async def resolve_video(url: str) -> ResolveResponse:
    cache_key = f"resolve:{hashlib.sha256(url.encode()).hexdigest()}"
    cached = await cache_service.get_json(cache_key)
    if cached:
        logger.info("cache_hit", key=cache_key)
        return ResolveResponse(**cached)

    ydl_opts: dict[str, Any] = {
        "quiet": True,
        "no_warnings": True,
        "skip_download": True,
        "noplaylist": True,
        "extract_flat": False,
        "socket_timeout": 30,
        "geo_bypass": True,
        "http_headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
            "Accept-Language": "en-US,en;q=0.9",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        },
        "extractor_args": {
            "tiktok": {
                "app_name": ["trill"],
                "app_version": ["34.1.2"],
            },
        },
    }

    # Reddit: use JSON API directly — yt-dlp requires auth for Reddit
    if "reddit.com" in url:
        try:
            result = await _resolve_reddit(url)
            await cache_service.set(cache_key, result.model_dump(), ttl=CACHE_TTL)
            logger.info("resolve_success", platform="reddit")
            return result
        except ValueError:
            raise
        except Exception as exc:
            logger.warning("reddit_api_fallback_to_ytdlp", error=str(exc))

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info: dict[str, Any] = ydl.extract_info(url, download=False)  # type: ignore[assignment]

        platform = detect_platform(url) or info.get("extractor_key", "unknown").lower()
        formats = _extract_formats(info)

        result = ResolveResponse(
            title=info.get("title") or "Untitled",
            thumbnail=info.get("thumbnail"),
            duration=info.get("duration"),
            author=info.get("uploader") or info.get("creator") or info.get("channel"),
            platform=platform,
            formats=formats,
        )

        await cache_service.set(cache_key, result.model_dump(), ttl=CACHE_TTL)
        logger.info("resolve_success", platform=platform)
        return result

    except yt_dlp.utils.DownloadError as exc:
        error_str = str(exc)
        logger.warning("ytdlp_download_error", error=error_str, url_hash=cache_key[-8:])
        raise ValueError(_map_error(error_str))
    except yt_dlp.utils.ExtractorError as exc:
        logger.warning("ytdlp_extractor_error", error=str(exc))
        raise ValueError(_map_error(str(exc)))
    except Exception as exc:
        logger.error("ytdlp_unexpected_error", error=str(exc))
        raise ValueError("An unexpected error occurred. Please try again.")
