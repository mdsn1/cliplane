import httpx
from typing import AsyncGenerator, Optional
from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import StreamingResponse
from app.services.analytics_service import track_download
from app.utils.platform_detector import detect_platform
from app.utils.validators import sanitize_filename
import structlog

router = APIRouter()
logger = structlog.get_logger()


@router.get("/api/download")
async def download(
    format_id: str,
    url: str,
    request: Request,
    title: Optional[str] = None,
    platform: Optional[str] = None,
    quality: Optional[str] = None,
) -> StreamingResponse:
    if not url.startswith(("http://", "https://")):
        raise HTTPException(status_code=400, detail="Invalid URL")

    platform = platform or detect_platform(url) or "unknown"

    try:
        async with httpx.AsyncClient(timeout=60.0, follow_redirects=True) as client:
            response = await client.get(
                url,
                headers={"User-Agent": "Mozilla/5.0 (compatible; Cliplane/1.0)"},
            )
            response.raise_for_status()

        content_type = response.headers.get("content-type", "video/mp4")
        ext = "mp4" if "video" in content_type else "m4a"
        filename = sanitize_filename(f"cliplane_download_{format_id[:8]}.{ext}")

        await track_download(platform, quality or format_id)

        pro_token = (request.headers.get("X-Pro-Token") or request.query_params.get("pro_token", "")).strip()
        if pro_token and title:
            from app.services.subscription_service import validate_pro_token
            from app.services.history_service import track_history
            if await validate_pro_token(pro_token):
                await track_history(pro_token, title, platform, quality)

        async def stream() -> AsyncGenerator[bytes, None]:
            async with httpx.AsyncClient(timeout=300.0, follow_redirects=True) as client:
                async with client.stream(
                    "GET",
                    url,
                    headers={"User-Agent": "Mozilla/5.0 (compatible; Cliplane/1.0)"},
                ) as r:
                    async for chunk in r.aiter_bytes(chunk_size=8192):
                        yield chunk

        return StreamingResponse(
            stream(),
            media_type=content_type,
            headers={
                "Content-Disposition": f'attachment; filename="{filename}"',
                "Cache-Control": "no-store",
            },
        )
    except httpx.HTTPStatusError as exc:
        logger.warning("download_http_error", status=exc.response.status_code)
        raise HTTPException(status_code=502, detail="Failed to fetch the video. Please try again.")
    except Exception as exc:
        logger.error("download_error", error=str(exc))
        raise HTTPException(status_code=500, detail="Download failed. Please try again.")
