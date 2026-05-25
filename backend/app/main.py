import structlog
import logging
from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.config import settings
from app.routers import health, resolve, download, dmca, contact, stripe_router, stats, subscription, batch, history
from app.middleware.error_handler import (
    validation_exception_handler,
    http_exception_handler,
    generic_exception_handler,
)
from app.services.cache_service import cache_service

# Configure structlog
structlog.configure(
    wrapper_class=structlog.make_filtering_bound_logger(
        logging.INFO if settings.ENVIRONMENT == "production" else logging.DEBUG
    ),
    processors=[
        structlog.contextvars.merge_contextvars,
        structlog.processors.add_log_level,
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.JSONRenderer() if settings.ENVIRONMENT == "production"
        else structlog.dev.ConsoleRenderer(),
    ],
)

logger = structlog.get_logger()

# Sentry (optional)
if settings.SENTRY_DSN:
    import sentry_sdk
    sentry_sdk.init(dsn=settings.SENTRY_DSN, environment=settings.ENVIRONMENT)


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    logger.info("startup", environment=settings.ENVIRONMENT)
    yield
    await cache_service.close()
    logger.info("shutdown")


app = FastAPI(
    title="Cliplane API",
    version="1.0.0",
    description="Backend API for Cliplane video downloader",
    docs_url="/api/docs" if settings.ENVIRONMENT != "production" else None,
    redoc_url=None,
    lifespan=lifespan,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=False,
    allow_methods=["GET", "POST", "DELETE"],
    allow_headers=["Content-Type", "Accept", "X-Pro-Token"],
    max_age=600,
)

# Exception handlers
app.add_exception_handler(RequestValidationError, validation_exception_handler)  # type: ignore[arg-type]
app.add_exception_handler(StarletteHTTPException, http_exception_handler)  # type: ignore[arg-type]
app.add_exception_handler(Exception, generic_exception_handler)

# Routers
app.include_router(health.router)
app.include_router(resolve.router)
app.include_router(download.router)
app.include_router(dmca.router)
app.include_router(contact.router)
app.include_router(stripe_router.router)
app.include_router(stats.router)
app.include_router(subscription.router)
app.include_router(batch.router)
app.include_router(history.router)
