from fastapi import APIRouter, File, UploadFile
from fastapi.responses import Response, FileResponse
from ..service.speech_to_text_service import SpeechToTextService
from ..service.llm_service import LLMService
import base64
from pydub import AudioSegment


router = APIRouter(
    prefix="/audio",
    tags=["Audio Chat Bot"],
)


@router.post("/send")
async def send_audio(file: UploadFile = File(...)):

    # Initiate services
    llm_service = LLMService().create(provider="GEMINI")
    speech_service = SpeechToTextService()

    # Save audio file temporarily
    with open(f"data/{file.filename}", "wb") as audio_file:
        audio_file.write(file.file.read())
        sound = AudioSegment.from_mp3(f"data/{file.filename}")
        sound.export(f"data/tmp.wav", format="wav")

    # Convert audio to text then get reply
    text = speech_service.speechToText(f"data/tmp.wav")
    answer = llm_service.reply(text)
    audio_filepath = speech_service.textToSpeech(answer)

    # Encode reply to base64
    with open(audio_filepath, "rb") as audio_file:
        encoded_audio = base64.b64encode(audio_file.read())

    return f"data:audio/mpeg;base64,{encoded_audio.decode('utf-8')}"
