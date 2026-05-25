import re
from typing import Optional

PLATFORM_PATTERNS: dict[str, re.Pattern[str]] = {
    "tiktok": re.compile(r"tiktok\.com", re.IGNORECASE),
    "pinterest": re.compile(r"(pinterest\.(com|ca|co\.uk|fr|de|es|pt|it|ru|jp|kr|nz|au)|pin\.it)", re.IGNORECASE),
    "twitter": re.compile(r"(twitter\.com|x\.com|(?<!\w)t\.co(?=/|$))", re.IGNORECASE),
    "reddit": re.compile(r"(reddit\.com|redd\.it|v\.redd\.it)", re.IGNORECASE),
    "facebook": re.compile(r"(facebook\.com|fb\.watch|fb\.com)", re.IGNORECASE),
    "vimeo": re.compile(r"vimeo\.com", re.IGNORECASE),
    "dailymotion": re.compile(r"(dailymotion\.com|dai\.ly)", re.IGNORECASE),
}

UNSUPPORTED_PATTERNS: dict[str, re.Pattern[str]] = {
    "youtube": re.compile(r"(youtube\.com|youtu\.be)", re.IGNORECASE),
    "instagram": re.compile(r"instagram\.com", re.IGNORECASE),
}


def detect_platform(url: str) -> Optional[str]:
    for platform, pattern in PLATFORM_PATTERNS.items():
        if pattern.search(url):
            return platform
    return None


def is_unsupported_platform(url: str) -> Optional[str]:
    for platform, pattern in UNSUPPORTED_PATTERNS.items():
        if pattern.search(url):
            return platform
    return None
