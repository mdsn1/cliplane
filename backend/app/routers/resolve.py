from fastapi import APIRouter, Request, HTTPException
from app.schemas.requests import ResolveRequest
from app.schemas.responses import ResolveResponse
from app.services.ytdlp_service import resolve_video, filter_formats_for_free
from app.services.subscription_service import validate_pro_token
from app.utils.platform_detector import detect_platform, is_unsupported_platform
from app.utils.rate_limiter import check_rate_limit
from app.config import settings
import structlog

router = APIRouter()
logger = structlog.get_logger()


def _get_client_ip(request: Request) -> str:
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


@router.post("/api/resolve", response_model=ResolveResponse)
async def resolve(request: Request, body: ResolveRequest) -> ResolveResponse:
    ip = _get_client_ip(request)
    pro_token = request.headers.get("X-Pro-Token", "").strip()
    is_pro = bool(pro_token) and await validate_pro_token(pro_token)

    unsupported = is_unsupported_platform(body.url)
    if unsupported:
        raise HTTPException(
            status_code=422,
            detail=f"{unsupported.capitalize()} is not supported. Cliplane supports TikTok, Pinterest, Twitter, Reddit, Facebook, Vimeo, and Dailymotion.",
        )

    platform = detect_platform(body.url)
    if not platform:
        raise HTTPException(
            status_code=422,
            detail="This platform is not supported. Please paste a URL from TikTok, Pinterest, Twitter, Reddit, Facebook, Vimeo, or Dailymotion.",
        )

    if not is_pro:
        allowed, remaining = await check_rate_limit(ip, settings.RATE_LIMIT_FREE)
        if not allowed:
            raise HTTPException(
                status_code=429,
                detail=f"Daily limit reached. Free users are limited to {settings.RATE_LIMIT_FREE} downloads per day. Upgrade to Pro for unlimited access.",
            )

    try:
        result = await resolve_video(body.url)
        if not is_pro:
            result = filter_formats_for_free(result)
        logger.info("resolve_complete", platform=platform, is_pro=is_pro)
        return result
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc))
    except Exception as exc:
        logger.error("resolve_unexpected_error", error=str(exc))
        raise HTTPException(status_code=500, detail="An unexpected error occurred. Please try again.")
