from app.core.database import SessionLocal
from app.models.customer import Customer
from app.models.failed_events import FailedEvent
from datetime import datetime

recovered_at=datetime.now()

db = SessionLocal()

try:

    customer = (
        db.query(Customer)
        .filter(Customer.email == "fatima@example.com")
        .first()
    )

    if not customer:
        print("Customer not found!")
        exit()

    demo_events = [
        ("UPI Timeout", 4999, "pending", 0.82),
        ("Bank Server Error", 2999, "pending", 0.76),
        ("Card Declined", 8999, "recovered", 0.91),
        ("Network Failure", 1999, "pending", 0.67),
        ("Insufficient Balance", 12999, "pending", 0.88),
        ("Payment Gateway Error", 3499, "recovered", 0.79),
        ("Session Expired", 2499, "pending", 0.71),
        ("OTP Verification Failed", 1499, "pending", 0.65),
        ("Transaction Limit Exceeded", 9999, "pending", 0.93),
        ("Bank Timeout", 5999, "recovered", 0.85),
    ]

    for reason, amount, status, prob in demo_events:
        event = FailedEvent(
            customer_id=customer.id,
            event_type="failed_payment",
            amount=amount,
            currency="INR",
            failure_reason=reason,
            status=status,
            recovery_probability=prob,
            recovered_at=datetime.now()
        )

        db.add(event)

    db.commit()

    print("Demo Data Inserted Successfully!")

except Exception as e:
    print(e)

finally:
    db.close()