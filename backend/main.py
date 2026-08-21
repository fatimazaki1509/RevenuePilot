from fastapi import FastAPI
from app.api.failed_events import router as failed_events_router
from app.core.config import settings

app = FastAPI(title=settings.APP_NAME)

app.include_router(failed_events_router)

@app.get("/")
def home():
    return {
        "message": f"{settings.APP_NAME} Backend Running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }