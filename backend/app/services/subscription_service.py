import secrets
from app.services.cache_service import cache_service
import structlog

logger = structlog.get_logger()
TOKEN_CACHE_TTL = 300  # 5 minutes


def generate_pro_token() -> str:
    return secrets.token_urlsafe(32)


async def validate_pro_token(token: str) -> bool:
    if not token or len(token) < 10:
        return False
    cache_key = f"pro_token:{token}"
    cached = await cache_service.get(cache_key)
    if cached is not None:
        return cached == "1"
    try:
        from app.services.analytics_service import get_pool
        pool = await get_pool()
        if pool is None:
            return False
        async with pool.acquire() as conn:
            row = await conn.fetchrow(
                "SELECT status FROM subscriptions WHERE pro_token = $1", token
            )
        is_valid = row is not None and row["status"] == "active"
        await cache_service.set(cache_key, "1" if is_valid else "0", ttl=TOKEN_CACHE_TTL)
        return is_valid
    except Exception as exc:
        logger.error("validate_pro_token_failed", error=str(exc))
        return False
