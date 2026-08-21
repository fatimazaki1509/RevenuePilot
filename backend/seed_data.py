from app.core.database import SessionLocal

from app.models.customer import Customer
from app.models.failed_events import FailedEvent

db = SessionLocal()

try:
    customer = Customer(
        name="Fatima Zaki",
        email="fatima@example.com",
        phone="9876543210",
        company="RevenuePilot Demo"
    )

    db.add(customer)
    db.commit()
    db.refresh(customer)

    failed_event = FailedEvent(
        customer_id=customer.id,
        event_type="failed_payment",
        amount=4999,
        currency="INR",
        failure_reason="UPI Timeout",
        status="pending",
        recovery_probability=0.82
    )

    db.add(failed_event)
    db.commit()

    print("Sample Data Inserted Successfully!")

except Exception as e:
    print("Error:")
    print(e)

finally:
    db.close()