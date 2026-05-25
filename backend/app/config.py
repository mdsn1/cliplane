from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import field_validator
from typing import Optional


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    ENVIRONMENT: str = "development"

    # Supabase
    SUPABASE_URL: str
    SUPABASE_SERVICE_KEY: str

    # Redis (Upstash)
    UPSTASH_REDIS_URL: str
    UPSTASH_REDIS_TOKEN: Optional[str] = None

    # Stripe
    STRIPE_SECRET_KEY: str
    STRIPE_WEBHOOK_SECRET: str
    STRIPE_PRICE_ID_MONTHLY: str
    STRIPE_PRICE_ID_ANNUAL: str

    # Resend
    RESEND_API_KEY: str
    DMCA_AGENT_EMAIL: str = "dmca@cliplane.com"
    ADMIN_EMAIL: str = "admin@cliplane.com"

    # Rate limiting
    RATE_LIMIT_FREE: int = 10

    # CORS
    ALLOWED_ORIGINS: str = "http://localhost:3000"

    # Sentry (optional)
    SENTRY_DSN: Optional[str] = None

    # Site
    SITE_URL: str = "https://cliplane.com"

    @field_validator("ALLOWED_ORIGINS")
    @classmethod
    def parse_origins(cls, v: str) -> str:
        return v  # stored as comma-separated, parsed at usage

    @property
    def allowed_origins_list(self) -> list[str]:
        return [o.strip() for o in self.ALLOWED_ORIGINS.split(",") if o.strip()]


def get_settings() -> Settings:
    return Settings()  # type: ignore[call-arg]


settings = get_settings()
