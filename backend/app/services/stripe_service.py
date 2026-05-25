import stripe
from app.config import settings
from app.services.subscription_service import generate_pro_token
import structlog

logger = structlog.get_logger()

stripe.api_key = settings.STRIPE_SECRET_KEY


async def create_checkout_session(plan: str, success_url: str, cancel_url: str) -> str:
    token = generate_pro_token()
    price_id = (
        settings.STRIPE_PRICE_ID_MONTHLY if plan == "monthly" else settings.STRIPE_PRICE_ID_ANNUAL
    )
    sep = "&" if "?" in success_url else "?"
    session = stripe.checkout.Session.create(
        mode="subscription",
        line_items=[{"price": price_id, "quantity": 1}],
        success_url=f"{success_url}{sep}token={token}",
        cancel_url=cancel_url,
        allow_promotion_codes=True,
        billing_address_collection="auto",
        client_reference_id=token,
    )
    return session.url or ""


def verify_webhook(payload: bytes, sig_header: str) -> stripe.Event:
    return stripe.Webhook.construct_event(payload, sig_header, settings.STRIPE_WEBHOOK_SECRET)


async def handle_subscription_event(event: stripe.Event) -> None:
    event_type = event["type"]
    data = event["data"]["object"]
    logger.info("stripe_event", type=event_type)

    if event_type == "checkout.session.completed":
        customer_email = data.get("customer_details", {}).get("email") or data.get("customer_email")
        subscription_id = data.get("subscription")
        customer_id = data.get("customer")
        token = data.get("client_reference_id") or generate_pro_token()
        if customer_email and subscription_id:
            await _upsert_subscription(customer_email, customer_id, subscription_id, "active", "pro", token)

    elif event_type == "customer.subscription.updated":
        await _update_subscription_status(data["id"], data["status"])

    elif event_type == "customer.subscription.deleted":
        await _update_subscription_status(data["id"], "cancelled")


async def _upsert_subscription(
    email: str, customer_id: str, subscription_id: str, status: str, plan: str, token: str = ""
) -> None:
    from app.services.analytics_service import get_pool
    try:
        pool = await get_pool()
        if pool is None:
            return
        async with pool.acquire() as conn:
            await conn.execute(
                """
                INSERT INTO subscriptions (user_email, stripe_customer_id, stripe_subscription_id, status, plan, pro_token, updated_at)
                VALUES ($1, $2, $3, $4, $5, $6, NOW())
                ON CONFLICT (stripe_subscription_id) DO UPDATE
                SET status = $4, updated_at = NOW()
                """,
                email, customer_id, subscription_id, status, plan, token or None,
            )
    except Exception as exc:
        logger.error("upsert_subscription_failed", error=str(exc))


async def _update_subscription_status(subscription_id: str, status: str) -> None:
    from app.services.analytics_service import get_pool
    try:
        pool = await get_pool()
        if pool is None:
            return
        async with pool.acquire() as conn:
            await conn.execute(
                "UPDATE subscriptions SET status = $1, updated_at = NOW() WHERE stripe_subscription_id = $2",
                status, subscription_id,
            )
    except Exception as exc:
        logger.error("update_subscription_failed", error=str(exc))
