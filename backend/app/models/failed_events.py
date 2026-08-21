from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    ForeignKey
)

from sqlalchemy.orm import relationship

from app.models.base import Base


class FailedEvent(Base):
    __tablename__ = "failed_events"

    id = Column(Integer, primary_key=True, index=True)

    customer_id = Column(
        Integer,
        ForeignKey("customers.id")
    )

    event_type = Column(String)

    amount = Column(Float)

    currency = Column(String)

    failure_reason = Column(String)

    status = Column(String)

    recovery_probability = Column(Float)

    customer = relationship(
        "Customer",
        back_populates="failed_events"
    )


#     # {
#   "customer_id": 1,
#   "event_type": "failed_payment",
#   "amount": 4999,
#   "currency": "INR",
#   "failure_reason": "UPI Timeout",
#   "status": "pending",
#   "recovery_probability": 0.82
# }