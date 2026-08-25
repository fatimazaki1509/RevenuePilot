from sqlalchemy import Column, Integer, String, Float

from app.models.base import Base


class PromiseToPay(Base):
    __tablename__ = "promise_to_pay"

    id = Column(Integer, primary_key=True, index=True)

    event_id = Column(Integer)

    customer_name = Column(String)

    amount = Column(Float)

    promised_date = Column(String)

    status = Column(String, default="Pending")