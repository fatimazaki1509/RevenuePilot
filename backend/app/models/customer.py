from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.models.base import Base


class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    email = Column(String, unique=True)

    phone = Column(String)

    company = Column(String)

    failed_events = relationship(
        "FailedEvent",
        back_populates="customer"
    )