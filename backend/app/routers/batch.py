import asyncio
from fastapi import APIRouter, HTTPException, Request
from app.schemas.requests import BatchResolveRequest
from app.schemas.responses import BatchResolveItem, BatchResolveResponse
from app.services.ytdlp_service import resolve_video
from app.services.subscription_service import validate_pro_token

router = APIRouter()


@router.post("/api/batch/resolve", response_model=BatchResolveResponse)
async def batch_resolve(request: Request, body: BatchResolveRequest) -> BatchResolveResponse:
    pro_token = request.headers.get("X-Pro-Token", "").strip()
    if not pro_token or not await validate_pro_token(pro_token):
        raise HTTPException(status_code=403, detail="Batch processing requires a Pro subscription.")

    async def resolve_one(url: str) -> BatchResolveItem:
        try:
            result = await resolve_video(url)
            return BatchResolveItem(url=url, result=result)
        except ValueError as exc:
            return BatchResolveItem(url=url, error=str(exc))
        except Exception:
            return BatchResolveItem(url=url, error="Failed to resolve URL.")

    results = await asyncio.gather(*[resolve_one(url) for url in body.urls])
    return BatchResolveResponse(results=list(results))
