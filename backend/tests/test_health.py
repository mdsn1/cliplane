import pytest
from fastapi.testclient import TestClient
import os

# Set required env vars before importing app
os.environ.setdefault("SUPABASE_URL", "https://placeholder.supabase.co")
os.environ.setdefault("SUPABASE_SERVICE_KEY", "placeholder")
os.environ.setdefault("UPSTASH_REDIS_URL", "redis://localhost:6379")
os.environ.setdefault("STRIPE_SECRET_KEY", "sk_test_placeholder")
os.environ.setdefault("STRIPE_WEBHOOK_SECRET", "whsec_placeholder")
os.environ.setdefault("STRIPE_PRICE_ID_MONTHLY", "price_placeholder")
os.environ.setdefault("STRIPE_PRICE_ID_ANNUAL", "price_placeholder")
os.environ.setdefault("RESEND_API_KEY", "re_placeholder")

from app.main import app  # noqa: E402

client = TestClient(app)


def test_health_returns_ok() -> None:
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert "version" in data
    assert "yt_dlp_version" in data
    assert data["uptime_seconds"] >= 0


def test_resolve_rejects_youtube() -> None:
    response = client.post("/api/resolve", json={"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"})
    assert response.status_code == 422
    assert "youtube" in response.json()["detail"].lower()


def test_resolve_rejects_instagram() -> None:
    response = client.post("/api/resolve", json={"url": "https://www.instagram.com/p/ABC123/"})
    assert response.status_code == 422


def test_resolve_rejects_invalid_url() -> None:
    response = client.post("/api/resolve", json={"url": "not-a-url"})
    assert response.status_code == 422


def test_resolve_rejects_unsupported_platform() -> None:
    response = client.post("/api/resolve", json={"url": "https://www.example.com/video/123"})
    assert response.status_code == 422


def test_public_stats() -> None:
    response = client.get("/api/stats/public")
    assert response.status_code == 200
    data = response.json()
    assert "total_downloads" in data
    assert data["platforms_supported"] == 7


def test_platform_detector() -> None:
    from app.utils.platform_detector import detect_platform, is_unsupported_platform

    assert detect_platform("https://www.tiktok.com/@user/video/123") == "tiktok"
    assert detect_platform("https://pinterest.com/pin/123") == "pinterest"
    assert detect_platform("https://twitter.com/user/status/123") == "twitter"
    assert detect_platform("https://x.com/user/status/123") == "twitter"
    assert detect_platform("https://www.reddit.com/r/sub/comments/abc/") == "reddit"
    assert detect_platform("https://www.facebook.com/video/123") == "facebook"
    assert detect_platform("https://vimeo.com/123456") == "vimeo"
    assert detect_platform("https://www.dailymotion.com/video/x123") == "dailymotion"
    assert detect_platform("https://www.youtube.com/watch?v=abc") is None

    assert is_unsupported_platform("https://www.youtube.com/watch?v=abc") == "youtube"
    assert is_unsupported_platform("https://www.instagram.com/p/abc") == "instagram"
    assert is_unsupported_platform("https://tiktok.com/@user/video/123") is None
