import os
from openai import OpenAI
from decouple import config
import google.generativeai as genai


class LLMService:

    provider = None

    def create(self, provider="GEMINI"):

        if provider == "OPENAI":
            return OpenAiService(api_key=config("OPENAI_API_KEY"))

        elif provider == "GEMINI":
            return GeminiService(api_key=config("GEMINI_API_KEY"))


class GeminiService:

    api_key = None

    def __init__(self, api_key: str = ""):
        self.api_key = api_key

    def reply(self, text: str):

        genai.configure(api_key=self.api_key)
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(text)

        print(f"You asked: {text}")
        print(f"Here's the answer: {response.text}")

        return response.text


class OpenAiService:

    api_key = None
    client = None

    def __init__(self, api_key: str = ""):
        self.api_key = api_key
        self.client = OpenAI(api_key=api_key)

    def reply(self, text: str):
        raise Exception("Method is not implemented")
