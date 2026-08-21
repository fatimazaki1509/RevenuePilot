from fastapi import APIRouter
from app.core.database import SessionLocal
from app.models.failed_events import FailedEvent
from app.models.customer import Customer


router = APIRouter()


@router.get("/failed-events")
def get_failed_events():

    db = SessionLocal()

    events = db.query(FailedEvent).all()

    result = []

    for event in events:
        result.append({
            "id": event.id,
            "customer_id": event.customer_id,
            "event_type": event.event_type,
            "amount": event.amount,
            "currency": event.currency,
            "failure_reason": event.failure_reason,
            "status": event.status,
            "recovery_probability": event.recovery_probability
        })

    db.close()

    return result