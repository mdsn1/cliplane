from fastapi import Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
import structlog

logger = structlog.get_logger()


async def validation_exception_handler(request: Request, exc: RequestValidationError) -> JSONResponse:
    errors = exc.errors()
    if errors:
        msg = errors[0].get("msg", "Validation error")
        field = " → ".join(str(x) for x in errors[0].get("loc", []) if x != "body")
        detail = f"{field}: {msg}" if field else msg
    else:
        detail = "Validation error"
    return JSONResponse(status_code=422, content={"detail": detail})


async def http_exception_handler(request: Request, exc: StarletteHTTPException) -> JSONResponse:
    logger.info("http_error", status=exc.status_code, path=str(request.url))
    return JSONResponse(status_code=exc.status_code, content={"detail": exc.detail})


async def generic_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    logger.error("unhandled_exception", path=str(request.url), error=str(exc))
    return JSONResponse(status_code=500, content={"detail": "Internal server error. Please try again."})
