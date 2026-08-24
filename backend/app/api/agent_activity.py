from fastapi import APIRouter

router = APIRouter()


@router.get("/agent-activity")
def agent_activity():

    return [
        {
            "text": "UPI Timeout detected",
            "time": "09:41 AM",
            "type": "analysis"
        },
        {
            "text": "AI recovery analysis completed",
            "time": "09:42 AM",
            "type": "ai"
        },
        {
            "text": "WhatsApp recovery initiated",
            "time": "09:43 AM",
            "type": "message"
        },
        {
            "text": "Payment link generated",
            "time": "09:44 AM",
            "type": "payment"
        }
    ]