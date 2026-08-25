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

        score = calculate_recovery_score(event)

        channel = recommend_channel(event)

        analysis = root_cause_analysis(event)

        # AI Agent Decision Layer
        if score >= 85:
            priority = "High"
            next_action = "Immediate Recovery Campaign"
        elif score >= 70:
            priority = "Medium"
            next_action = "Promise To Pay Follow-up"
        else:
            priority = "Low"
            next_action = "Manual Review"

        return {
            "event_id": event.id,
            "amount": event.amount,
            "failure_reason": event.failure_reason,
            "status": event.status,

            "recovery_score": score,
            "recommended_channel": channel,

            "root_cause": analysis["root_cause"],
            "impact": analysis["impact"],
            "recommended_action": analysis["action"],

            # New AI Fields
            "priority": priority,
            "next_best_action": next_action,
            "agent_confidence": score,
            "estimated_recovery_value": event.amount
        }

    finally:
        db.close()