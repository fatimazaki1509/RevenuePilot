from fastapi import APIRouter

router = APIRouter()

activity_log = [
    {
        "text": "RevenuePilot Engine Started",
        "time": "LIVE",
        "type": "system"
    }
]


@router.get("/agent-activity")
def agent_activity():
    return activity_log