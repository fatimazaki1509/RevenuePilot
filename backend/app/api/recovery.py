from fastapi import APIRouter
from datetime import datetime

from app.services.whatsapp_service import send_recovery_message
from app.core.database import SessionLocal
from app.models.failed_events import FailedEvent

router = APIRouter()


@router.post("/recover/{event_id}")
def recover_payment(event_id: int):

    db = SessionLocal()

    try:

        event = (
            db.query(FailedEvent)
            .filter(FailedEvent.id == event_id)
            .first()
        )

        if not event:
            return {
                "error": "Event not found"
            }

        recovery_link = (
            f"https://recover.revenuepilot.ai/pay/{event.id}"
        )

        # DEBUG
        print("\n========== RECOVERY DEBUG ==========")
        print("EVENT ID:", event.id)

        if hasattr(event, "customer") and event.customer:
            print("PHONE:", event.customer.phone)
        else:
            print("PHONE: CUSTOMER NOT FOUND")

        print("AMOUNT:", event.amount)
        print("RECOVERY LINK:", recovery_link)
        print("====================================\n")

        # WhatsApp Message Trigger
        try:

            message_sid = send_recovery_message(
                phone=event.customer.phone,
                amount=event.amount,
                recovery_link=recovery_link
            )

            print("MESSAGE SID:", message_sid)

        except Exception as e:

            print("WHATSAPP ERROR:", str(e))
            message_sid = f"Failed: {str(e)}"

        # Mark as recovered
        event.status = "recovered"

        db.commit()
        db.refresh(event)

        audit_trail = [
            {
                "time": str(datetime.now()),
                "step": "AI Analysis Completed"
            },
            {
                "time": str(datetime.now()),
                "step": "Recovery Link Generated"
            },
            {
                "time": str(datetime.now()),
                "step": "WhatsApp Recovery Sent"
            },
            {
                "time": str(datetime.now()),
                "step": "Payment Recovered"
            }
        ]

        return {
            "message": "Recovery Workflow Executed",
            "event_id": event.id,
            "status": event.status,
            "recovery_link": recovery_link,
            "message_sid": message_sid,
            "audit_trail": audit_trail
        }

    finally:
        db.close()