from fastapi import APIRouter
from datetime import datetime

from app.core.database import SessionLocal
from app.models.promise_to_pay import PromiseToPay
from app.models.failed_events import FailedEvent

router = APIRouter()


@router.post("/promise/{event_id}")
def create_promise(event_id: int):

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

        promise = PromiseToPay(
        event_id=event.id,
        customer_name=event.customer.name,
        amount=event.amount,
        promised_date="2026-08-28",
        status="Promised"
)

        db.add(promise)
        db.commit()
        db.refresh(promise)

        return {
            "message": "Promise To Pay Created",
            "promise_id": promise.id,
            "amount": promise.amount,
            "date": promise.promised_date,
            "status": promise.status
        }

    finally:
        db.close()
@router.get("/promises")
def get_promises():

    db = SessionLocal()

    try:
        promises = db.query(PromiseToPay).all()

        return promises

    finally:
        db.close()