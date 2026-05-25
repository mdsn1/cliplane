import uuid
from fastapi import APIRouter, HTTPException
from app.schemas.requests import DMCARequest
from app.schemas.responses import DMCAResponse
from app.services.email_service import send_dmca_email
from app.services.analytics_service import get_pool
import structlog
from datetime import datetime, timezone

router = APIRouter()
logger = structlog.get_logger()


@router.post("/api/dmca", response_model=DMCAResponse)
async def submit_dmca(body: DMCARequest) -> DMCAResponse:
    confirmation_id = f"DMCA-{uuid.uuid4().hex[:8].upper()}"

    # Store in database
    try:
        pool = await get_pool()
        if pool:
            async with pool.acquire() as conn:
                await conn.execute(
                    """
                    INSERT INTO dmca_submissions
                    (name, email, infringing_url, original_url, statement, signature, status, created_at)
                    VALUES ($1, $2, $3, $4, $5, $6, 'pending', $7)
                    """,
                    body.name,
                    str(body.email),
                    str(body.infringing_url),
                    str(body.original_url),
                    body.statement,
                    body.signature,
                    datetime.now(timezone.utc),
                )
    except Exception as exc:
        logger.warning("dmca_db_store_failed", error=str(exc))

    # Send email
    email_sent = await send_dmca_email(
        name=body.name,
        email=str(body.email),
        infringing_url=str(body.infringing_url),
        original_url=str(body.original_url),
        statement=body.statement,
        signature=body.signature,
        confirmation_id=confirmation_id,
    )

    if not email_sent:
        logger.error("dmca_email_failed", confirmation_id=confirmation_id)
        raise HTTPException(
            status_code=500,
            detail="Failed to process your notice. Please email dmca@cliplane.com directly.",
        )

    logger.info("dmca_submitted", confirmation_id=confirmation_id)
    return DMCAResponse(
        confirmation_id=confirmation_id,
        message="Your DMCA notice has been received. We will review it within 48 hours.",
    )
