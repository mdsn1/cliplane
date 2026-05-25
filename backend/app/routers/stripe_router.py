import stripe
from fastapi import APIRouter, HTTPException, Request, Response
from app.schemas.requests import CheckoutRequest
from app.schemas.responses import CheckoutResponse
from app.services.stripe_service import create_checkout_session, verify_webhook, handle_subscription_event
from app.config import settings
import structlog

router = APIRouter()
logger = structlog.get_logger()


@router.post("/api/stripe/create-checkout-session", response_model=CheckoutResponse)
async def create_session(request: Request, body: CheckoutRequest) -> CheckoutResponse:
    origin = request.headers.get("origin") or settings.SITE_URL
    success_url = f"{origin}/pricing?success=true"
    cancel_url = f"{origin}/pricing"

    try:
        url = await create_checkout_session(
            plan=body.plan,
            success_url=success_url,
            cancel_url=cancel_url,
        )
        return CheckoutResponse(url=url)
    except stripe.StripeError as exc:
        logger.error("stripe_checkout_error", error=str(exc))
        raise HTTPException(status_code=500, detail="Failed to create checkout session.")


@router.post("/api/stripe/webhook")
async def stripe_webhook(request: Request) -> Response:
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature", "")

    try:
        event = verify_webhook(payload, sig_header)
    except stripe.SignatureVerificationError:
        logger.warning("stripe_webhook_invalid_signature")
        raise HTTPException(status_code=400, detail="Invalid signature")
    except Exception as exc:
        logger.error("stripe_webhook_error", error=str(exc))
        raise HTTPException(status_code=400, detail="Webhook error")

    try:
        await handle_subscription_event(event)
    except Exception as exc:
        logger.error("stripe_event_handler_error", event_type=event["type"], error=str(exc))

    return Response(content="OK", status_code=200)
