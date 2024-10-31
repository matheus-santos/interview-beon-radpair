from gtts import gTTS
import speech_recognition as sr
from pydub import AudioSegment


class SpeechToTextService:
    def __init__(self):
        pass

    def speechToText(self, filepath: str = ""):

        tmp_filepath = "data/input_tmp.wav"

        # Save audio file as WAV so we can use audioFile
        # recognition capabilities
        sound = AudioSegment.from_file(filepath, "webm")
        sound.export(tmp_filepath, format="wav")

        recognizer = sr.Recognizer()

        with sr.AudioFile(tmp_filepath) as source:
            audio_data = recognizer.record(source)
            return recognizer.recognize_google(audio_data)

    def textToSpeech(self, text, filename="output"):
        audio = gTTS(text=text, lang="en", slow=False)
        audio.save(f"data/{filename}.mp3")
        return f"data/{filename}.mp3"
