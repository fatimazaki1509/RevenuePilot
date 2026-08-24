from fastapi import APIRouter

from app.core.database import SessionLocal
from app.models.failed_events import FailedEvent

from app.services.recovery_engine import (
    calculate_recovery_score,
    recommend_channel,
    root_cause_analysis
)

router = APIRouter()


@router.get("/ai-decision/{event_id}")
def ai_decision(event_id: int):

    db = SessionLocal()

    event = (
        db.query(FailedEvent)
        .filter(FailedEvent.id == event_id)
        .first()
    )

    if not event:
        db.close()
        return {
            "error": "Event not found"
        }

    score = calculate_recovery_score(event)

    channel = recommend_channel(event)

    analysis = root_cause_analysis(event)

    response = {
        "event_id": event.id,
        "amount": event.amount,
        "failure_reason": event.failure_reason,
        "status": event.status,

        "recovery_score": score,
        "recommended_channel": channel,

        "root_cause": analysis["root_cause"],
        "impact": analysis["impact"],
        "recommended_action": analysis["action"]
    }

    db.close()

    return response