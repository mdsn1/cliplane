import resend
from app.config import settings
import structlog

logger = structlog.get_logger()

resend.api_key = settings.RESEND_API_KEY


async def send_contact_email(name: str, email: str, subject: str, message: str) -> bool:
    try:
        params: resend.Emails.SendParams = {
            "from": "Cliplane Contact <noreply@cliplane.com>",
            "to": [settings.ADMIN_EMAIL],
            "reply_to": email,
            "subject": f"[Contact] {subject}",
            "html": f"""
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> {name}</p>
<p><strong>Email:</strong> {email}</p>
<p><strong>Subject:</strong> {subject}</p>
<hr/>
<p><strong>Message:</strong></p>
<p>{message.replace(chr(10), '<br>')}</p>
""",
        }
        resend.Emails.send(params)
        logger.info("contact_email_sent", subject=subject)
        return True
    except Exception as exc:
        logger.error("contact_email_failed", error=str(exc))
        return False


async def send_dmca_email(
    name: str,
    email: str,
    infringing_url: str,
    original_url: str,
    statement: str,
    signature: str,
    confirmation_id: str,
) -> bool:
    try:
        params: resend.Emails.SendParams = {
            "from": "Cliplane DMCA <noreply@cliplane.com>",
            "to": [settings.DMCA_AGENT_EMAIL],
            "reply_to": email,
            "subject": f"[DMCA] Takedown Notice — {confirmation_id}",
            "html": f"""
<h2>DMCA Takedown Notice</h2>
<p><strong>Confirmation ID:</strong> {confirmation_id}</p>
<p><strong>Name:</strong> {name}</p>
<p><strong>Email:</strong> {email}</p>
<p><strong>Infringing URL:</strong> {infringing_url}</p>
<p><strong>Original Work URL:</strong> {original_url}</p>
<hr/>
<p><strong>Statement:</strong></p>
<p>{statement.replace(chr(10), '<br>')}</p>
<p><strong>Electronic Signature:</strong> {signature}</p>
""",
        }
        resend.Emails.send(params)
        logger.info("dmca_email_sent", confirmation_id=confirmation_id)
        return True
    except Exception as exc:
        logger.error("dmca_email_failed", error=str(exc))
        return False
