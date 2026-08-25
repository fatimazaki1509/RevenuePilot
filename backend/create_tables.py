from app.core.database import engine

from app.models.base import Base
from app.models.customer import Customer
from app.models.failed_events import FailedEvent
from app.models.promise_to_pay import PromiseToPay

Base.metadata.create_all(bind=engine)

print("Tables Created Successfully!")