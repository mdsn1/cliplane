from fastapi import APIRouter, HTTPException
from app.services.subscription_service import validate_pro_token
from app.services.history_service import get_history, clear_history
from app.schemas.responses import HistoryItem, HistoryResponse

router = APIRouter()


@router.get("/api/history", response_model=HistoryResponse)
async def get_download_history(token: str) -> HistoryResponse:
    if not await validate_pro_token(token):
        raise HTTPException(status_code=403, detail="History requires a Pro subscription.")
    items_raw = await get_history(token)
    items = [HistoryItem(**item) for item in items_raw]
    return HistoryResponse(items=items)


@router.delete("/api/history")
async def clear_download_history(token: str) -> dict:
    if not await validate_pro_token(token):
        raise HTTPException(status_code=403, detail="History requires a Pro subscription.")
    await clear_history(token)
    return {"message": "History cleared."}
