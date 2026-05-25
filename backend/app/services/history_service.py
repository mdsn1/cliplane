from datetime import datetime, timezone
from typing import Optional
import structlog

logger = structlog.get_logger()


async def track_history(
    token: str,
    title: Optional[str],
    platform: Optional[str],
    quality: Optional[str],
    original_url: Optional[str] = None,
) -> None:
    try:
        from app.services.analytics_service import get_pool
        pool = await get_pool()
        if pool is None:
            return
        async with pool.acquire() as conn:
            await conn.execute(
                """
                INSERT INTO download_history (pro_token, title, platform, quality, original_url, downloaded_at)
                VALUES ($1, $2, $3, $4, $5, $6)
                """,
                token, title, platform, quality, original_url, datetime.now(timezone.utc),
            )
    except Exception as exc:
        logger.warning("track_history_failed", error=str(exc))


async def get_history(token: str) -> list[dict]:
    try:
        from app.services.analytics_service import get_pool
        pool = await get_pool()
        if pool is None:
            return []
        async with pool.acquire() as conn:
            rows = await conn.fetch(
                """
                SELECT title, platform, quality, original_url, downloaded_at
                FROM download_history
                WHERE pro_token = $1
                  AND downloaded_at > NOW() - INTERVAL '30 days'
                ORDER BY downloaded_at DESC
                LIMIT 200
                """,
                token,
            )
        return [dict(r) for r in rows]
    except Exception as exc:
        logger.warning("get_history_failed", error=str(exc))
        return []


async def clear_history(token: str) -> None:
    try:
        from app.services.analytics_service import get_pool
        pool = await get_pool()
        if pool is None:
            return
        async with pool.acquire() as conn:
            await conn.execute(
                "DELETE FROM download_history WHERE pro_token = $1", token
            )
    except Exception as exc:
        logger.warning("clear_history_failed", error=str(exc))
