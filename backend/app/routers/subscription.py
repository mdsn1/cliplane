from fastapi import APIRouter
from app.services.subscription_service import validate_pro_token
from app.schemas.responses import SubscriptionStatusResponse

router = APIRouter()


@router.get("/api/subscription/status", response_model=SubscriptionStatusResponse)
async def subscription_status(token: str = "") -> SubscriptionStatusResponse:
    if not token:
        return SubscriptionStatusResponse(plan="free", valid=False)
    is_pro = await validate_pro_token(token)
    return SubscriptionStatusResponse(plan="pro" if is_pro else "free", valid=is_pro)
