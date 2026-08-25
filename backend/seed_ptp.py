from app.core.database import SessionLocal
from app.models.promise_to_pay import PromiseToPay

db = SessionLocal()

try:

    ptp1 = PromiseToPay(
        customer_name="Fatima",
        amount=4999,
        promised_date="2026-08-26",
        status="pending"
    )

    ptp2 = PromiseToPay(
        customer_name="Rahul",
        amount=8999,
        promised_date="2026-08-24",
        status="pending"
    )

    db.add(ptp1)
    db.add(ptp2)

    db.commit()

    print("PTP Demo Data Added!")

except Exception as e:
    print(e)

finally:
    db.close()