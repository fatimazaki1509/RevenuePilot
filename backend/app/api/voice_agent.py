from fastapi import APIRouter

router = APIRouter()

voice_results = []

@router.post("/voice-result")
def save_voice_result(data: dict):

    voice_results.append(data)

    return {
        "message": "Voice result saved"
    }

@router.get("/voice-results")
def get_voice_results():
    return voice_results