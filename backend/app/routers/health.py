import time
import yt_dlp
from fastapi import APIRouter
from app.schemas.responses import HealthResponse

router = APIRouter()
START_TIME = time.time()
VERSION = "1.0.0"


@router.get("/api/health", response_model=HealthResponse)
async def health_check() -> HealthResponse:
    return HealthResponse(
        status="ok",
        version=VERSION,
        yt_dlp_version=yt_dlp.version.__version__,
        uptime_seconds=round(time.time() - START_TIME, 2),
    )
