from typing import Optional
from app.services.cache_service import cache_service
import structlog

logger = structlog.get_logger()

RATE_LIMIT_WINDOW = 86400  # 24 hours in seconds


async def check_rate_limit(ip: str, limit: int) -> tuple[bool, int]:
    """Returns (allowed, remaining). If Redis unavailable, allows request."""
    try:
        key = f"rl:daily:{ip}"
        current = await cache_service.get(key)
        count = int(current) if current else 0

        if count >= limit:
            return False, 0

        new_count = await cache_service.increment(key)
        if new_count == 1:
            await cache_service.expire(key, RATE_LIMIT_WINDOW)

        return True, max(0, limit - new_count)
    except Exception as exc:
        logger.warning("rate_limit_check_failed", error=str(exc))
        return True, limit  # fail open — don't block on Redis errors
