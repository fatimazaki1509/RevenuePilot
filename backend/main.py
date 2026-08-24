from fastapi import FastAPI
from app.api.failed_events import router as failed_events_router
from app.api.dashboard import router as dashboard_router
from app.api.recovery import router as recovery_router
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.ai_decision import router as ai_router
from app.api.agent_activity import router as activity_router
from app.api.recovery_chart import router as chart_router
from app.services.whatsapp_service import send_recovery_message

app = FastAPI(title=settings.APP_NAME)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(failed_events_router)
app.include_router(dashboard_router)
app.include_router(recovery_router)
app.include_router(ai_router)
app.include_router(activity_router)
app.include_router(chart_router)


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