from fastapi import APIRouter

from .controller.audio_controller import router as voice_router
from .system.routes import router as system_router

api_router = APIRouter()

api_router.include_router(voice_router)
api_router.include_router(system_router)
