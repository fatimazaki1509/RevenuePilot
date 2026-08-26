from fastapi import APIRouter
from app.core.database import SessionLocal
from app.models.failed_events import FailedEvent
from app.models.customer import Customer

router = APIRouter()


@router.post("/create-event")
def create_event(payload: dict):

    db = SessionLocal()

    try:

        customer = Customer(
            name=payload["customer_name"],
            phone=payload["phone"]
        )

        db.add(customer)
        db.commit()
        db.refresh(customer)

        event = FailedEvent(
            customer_id=customer.id,
            amount=float(payload["amount"]),
            failure_reason=payload["failure_reason"],
            status="pending",
            recovery_probability=85
        )

        db.add(event)
        db.commit()

        return {
            "message": "Event Created"
        }

    finally:
        db.close()