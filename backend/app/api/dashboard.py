from fastapi import APIRouter
from app.core.database import SessionLocal
from app.models.failed_events import FailedEvent

router = APIRouter()


@router.get("/dashboard-metrics")
def dashboard_metrics():

    db = SessionLocal()

    events = db.query(FailedEvent).all()

    revenue_at_risk = sum(
        e.amount
        for e in events
        if e.status == "pending"
    )

    recovered_revenue = sum(
        e.amount
        for e in events
        if e.status == "recovered"
    )

    total_failed = len(events)

    recovered_transactions = len(
        [
            e
            for e in events
            if e.status == "recovered"
        ]
    )

    recovery_rate = (
        recovered_transactions
        / total_failed
        * 100
        if total_failed > 0
        else 0
    )

    # NEW CODE
    latest_recovery = (
        db.query(FailedEvent)
        .filter(FailedEvent.status == "recovered")
        .order_by(FailedEvent.recovered_at.desc())
        .first()
    )

    db.close()

    return {
        "revenue_at_risk": revenue_at_risk,
        "recovered_revenue": recovered_revenue,
        "total_failed_transactions": total_failed,
        "recovery_rate": round(recovery_rate, 2),

        # NEW FIELD
        "last_recovered_at": (
            latest_recovery.recovered_at.isoformat()
            if latest_recovery and latest_recovery.recovered_at
            else None
        ),
    }