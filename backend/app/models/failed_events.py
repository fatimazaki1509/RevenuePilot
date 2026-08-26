from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    ForeignKey,
    DateTime
)

from datetime import datetime
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

    recovered_at = Column(
        DateTime,
        nullable=True
    )

    customer = relationship(
        "Customer",
        back_populates="failed_events"
    )