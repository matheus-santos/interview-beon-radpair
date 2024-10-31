from gtts import gTTS
import speech_recognition as sr


class SpeechToTextService:
    def __init__(self):
        pass

    def speechToText(self, filepath: str = ""):

        recognizer = sr.Recognizer()

        with sr.AudioFile(filepath) as source:
            audio_data = recognizer.record(source)
            return recognizer.recognize_google(audio_data)

    def textToSpeech(self, text, filename="text_to_speech"):
        audio = gTTS(text=text, lang="en", slow=False)
        audio.save(f"data/{filename}.mp3")
        return f"data/{filename}.mp3"
