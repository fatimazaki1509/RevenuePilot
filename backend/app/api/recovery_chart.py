from fastapi import APIRouter
from app.core.database import SessionLocal
from app.models.failed_events import FailedEvent

router = APIRouter()


@router.get("/recovery-chart")
def recovery_chart():

    db = SessionLocal()

    try:
        events = db.query(FailedEvent).all()

        pending_amount = sum(
            float(e.amount or 0)
            for e in events
            if e.status == "pending"
        )

        recovered_amount = sum(
            float(e.amount or 0)
            for e in events
            if e.status == "recovered"
        )

        return [
            {
                "day": "Today",
                "risk": pending_amount,
                "recovered": recovered_amount,
            }
        ]

    finally:
        db.close()