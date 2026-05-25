import json
from typing import Any, Optional
import redis.asyncio as redis
from app.config import settings
import structlog

logger = structlog.get_logger()


class CacheService:
    def __init__(self) -> None:
        self._client: Optional[redis.Redis] = None  # type: ignore[type-arg]

    def _get_client(self) -> redis.Redis:  # type: ignore[type-arg]
        if self._client is None:
            self._client = redis.from_url(
                settings.UPSTASH_REDIS_URL,
                encoding="utf-8",
                decode_responses=True,
            )
        return self._client

    async def get(self, key: str) -> Optional[str]:
        try:
            client = self._get_client()
            return await client.get(key)  # type: ignore[return-value]
        except Exception as exc:
            logger.warning("cache_get_failed", key=key, error=str(exc))
            return None

    async def set(self, key: str, value: Any, ttl: int = 600) -> bool:
        try:
            client = self._get_client()
            serialized = json.dumps(value) if not isinstance(value, str) else value
            await client.setex(key, ttl, serialized)
            return True
        except Exception as exc:
            logger.warning("cache_set_failed", key=key, error=str(exc))
            return False

    async def get_json(self, key: str) -> Optional[Any]:
        raw = await self.get(key)
        if raw is None:
            return None
        try:
            return json.loads(raw)
        except json.JSONDecodeError:
            return None

    async def delete(self, key: str) -> None:
        try:
            client = self._get_client()
            await client.delete(key)
        except Exception as exc:
            logger.warning("cache_delete_failed", key=key, error=str(exc))

    async def increment(self, key: str) -> int:
        try:
            client = self._get_client()
            return int(await client.incr(key))
        except Exception as exc:
            logger.warning("cache_incr_failed", key=key, error=str(exc))
            return 1

    async def expire(self, key: str, ttl: int) -> None:
        try:
            client = self._get_client()
            await client.expire(key, ttl)
        except Exception as exc:
            logger.warning("cache_expire_failed", key=key, error=str(exc))

    async def close(self) -> None:
        if self._client:
            await self._client.aclose()
            self._client = None


cache_service = CacheService()
