from pydantic import BaseModel, HttpUrl, EmailStr, field_validator
from typing import Literal


class ResolveRequest(BaseModel):
    url: str

    @field_validator("url")
    @classmethod
    def validate_url(cls, v: str) -> str:
        v = v.strip()
        if not v.startswith(("http://", "https://")):
            raise ValueError("URL must start with http:// or https://")
        if len(v) > 2048:
            raise ValueError("URL is too long")
        return v


class DownloadRequest(BaseModel):
    format_id: str
    url: str


class DMCARequest(BaseModel):
    name: str
    email: EmailStr
    infringing_url: HttpUrl
    original_url: HttpUrl
    statement: str
    signature: str

    @field_validator("name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        if len(v.strip()) < 2:
            raise ValueError("Name must be at least 2 characters")
        return v.strip()

    @field_validator("statement")
    @classmethod
    def validate_statement(cls, v: str) -> str:
        if len(v.strip()) < 50:
            raise ValueError("Statement must be at least 50 characters")
        return v.strip()


class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

    @field_validator("name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        if len(v.strip()) < 2:
            raise ValueError("Name too short")
        return v.strip()

    @field_validator("message")
    @classmethod
    def validate_message(cls, v: str) -> str:
        if len(v.strip()) < 20:
            raise ValueError("Message must be at least 20 characters")
        return v.strip()


class CheckoutRequest(BaseModel):
    plan: Literal["monthly", "annual"]


class BatchResolveRequest(BaseModel):
    urls: list[str]

    @field_validator("urls")
    @classmethod
    def validate_urls(cls, v: list[str]) -> list[str]:
        if not v:
            raise ValueError("At least one URL required")
        if len(v) > 25:
            raise ValueError("Maximum 25 URLs per batch")
        cleaned = []
        for url in v:
            url = url.strip()
            if not url.startswith(("http://", "https://")):
                raise ValueError(f"Invalid URL: {url}")
            if len(url) > 2048:
                raise ValueError("URL too long")
            cleaned.append(url)
        return cleaned
