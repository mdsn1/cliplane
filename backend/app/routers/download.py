from typing import Optional
from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import RedirectResponse
from app.services.analytics_service import track_download
from app.utils.platform_detector import detect_platform
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
) -> RedirectResponse:
    if not url.startswith(("http://", "https://")):
        raise HTTPException(status_code=400, detail="Invalid URL")

    platform = platform or detect_platform(url) or "unknown"

    await track_download(platform, quality or format_id)

    pro_token = (request.headers.get("X-Pro-Token") or request.query_params.get("pro_token", "")).strip()
    if pro_token and title:
        from app.services.subscription_service import validate_pro_token
        from app.services.history_service import track_history
        if await validate_pro_token(pro_token):
            await track_history(pro_token, title, platform, quality)

    logger.info("download_redirect", platform=platform)
    return RedirectResponse(url=url, status_code=302)
