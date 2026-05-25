from fastapi import APIRouter
from app.schemas.responses import PublicStatsResponse
from app.services.analytics_service import get_total_downloads

router = APIRouter()


@router.get("/api/stats/public", response_model=PublicStatsResponse)
async def public_stats() -> PublicStatsResponse:
    total = await get_total_downloads()
    return PublicStatsResponse(
        total_downloads=total,
        platforms_supported=7,
    )
