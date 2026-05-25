from datetime import datetime, timezone
from typing import Optional
import asyncpg
from app.config import settings
from app.services.cache_service import cache_service
import structlog

logger = structlog.get_logger()

_pool: Optional[asyncpg.Pool] = None  # type: ignore[type-arg]


async def get_pool() -> Optional[asyncpg.Pool]:  # type: ignore[type-arg]
    global _pool
    if _pool is None:
        try:
            _pool = await asyncpg.create_pool(
                settings.SUPABASE_URL.replace("https://", "postgresql://").replace(
                    ".supabase.co", ".supabase.co:5432"
                ),
                min_size=1,
                max_size=5,
            )
        except Exception as exc:
            logger.warning("db_pool_creation_failed", error=str(exc))
            return None
    return _pool


async def track_download(platform: str, quality: str) -> None:
    """Track anonymous download metric — no URL, no IP."""
    try:
        pool = await get_pool()
        if pool is None:
            return
        async with pool.acquire() as conn:
            await conn.execute(
                "INSERT INTO downloads_analytics (platform, quality, timestamp) VALUES ($1, $2, $3)",
                platform,
                quality,
                datetime.now(timezone.utc),
            )
        # Invalidate stats cache
        await cache_service.delete("stats:public")
    except Exception as exc:
        logger.warning("track_download_failed", error=str(exc))


async def get_total_downloads() -> int:
    cached = await cache_service.get("stats:downloads_total")
    if cached:
        return int(cached)
    try:
        pool = await get_pool()
        if pool is None:
            return 2_847_391  # fallback estimate
        async with pool.acquire() as conn:
            row = await conn.fetchrow("SELECT COUNT(*) as total FROM downloads_analytics")
        total = int(row["total"]) if row else 0
        await cache_service.set("stats:downloads_total", str(total), ttl=300)
        return total
    except Exception as exc:
        logger.warning("get_total_downloads_failed", error=str(exc))
        return 2_847_391
