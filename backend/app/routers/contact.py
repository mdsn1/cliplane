from fastapi import APIRouter, HTTPException, Request
from app.schemas.requests import ContactRequest
from app.schemas.responses import ContactResponse
from app.services.email_service import send_contact_email
from app.utils.rate_limiter import check_rate_limit
import structlog

router = APIRouter()
logger = structlog.get_logger()

CONTACT_RATE_LIMIT = 5  # 5 messages per hour per IP


@router.post("/api/contact", response_model=ContactResponse)
async def contact(request: Request, body: ContactRequest) -> ContactResponse:
    forwarded = request.headers.get("X-Forwarded-For")
    ip = (forwarded.split(",")[0].strip() if forwarded else (request.client.host if request.client else "unknown"))

    allowed, _ = await check_rate_limit(f"contact:{ip}", CONTACT_RATE_LIMIT)
    if not allowed:
        raise HTTPException(
            status_code=429,
            detail="Too many messages. Please wait before sending another.",
        )

    sent = await send_contact_email(
        name=body.name,
        email=str(body.email),
        subject=body.subject,
        message=body.message,
    )

    if not sent:
        raise HTTPException(
            status_code=500,
            detail="Failed to send message. Please email contact@cliplane.com directly.",
        )

    return ContactResponse(message="Your message has been sent. We'll reply within 24 hours.")
