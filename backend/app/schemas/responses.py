from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class VideoFormat(BaseModel):
    quality: str
    size: Optional[int] = None
    format_id: str
    url: str
    ext: str
    has_audio: bool = True
    is_video: bool = True
    fps: Optional[float] = None
    vcodec: Optional[str] = None
    acodec: Optional[str] = None


class ResolveResponse(BaseModel):
    title: str
    thumbnail: Optional[str] = None
    duration: Optional[int] = None
    author: Optional[str] = None
    platform: str
    formats: list[VideoFormat]


class HealthResponse(BaseModel):
    status: str
    version: str
    yt_dlp_version: str
    uptime_seconds: float


class PublicStatsResponse(BaseModel):
    total_downloads: int
    platforms_supported: int


class DMCAResponse(BaseModel):
    confirmation_id: str
    message: str


class ContactResponse(BaseModel):
    message: str


class CheckoutResponse(BaseModel):
    url: str


class ErrorResponse(BaseModel):
    detail: str
    code: Optional[str] = None


class SubscriptionStatusResponse(BaseModel):
    plan: str
    valid: bool


class BatchResolveItem(BaseModel):
    url: str
    result: Optional["ResolveResponse"] = None
    error: Optional[str] = None


class BatchResolveResponse(BaseModel):
    results: list[BatchResolveItem]


class HistoryItem(BaseModel):
    title: Optional[str] = None
    platform: Optional[str] = None
    quality: Optional[str] = None
    original_url: Optional[str] = None
    downloaded_at: datetime


class HistoryResponse(BaseModel):
    items: list[HistoryItem]
