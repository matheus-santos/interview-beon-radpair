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

    base_prompt = """
    System: You are a helpful assistant with a entusiastic view of the world.
    For any question asked, try to be objective on the answer. Avoid using 
    special characters on your answer or complicated words. Try to answer in a 
    few sentences and if you do not know the answer, explain the reason to the
    user.
    Your mission: your mission is to work as an assistant and interact with
    the user with the best of your knowledge.
    
    """

    def __init__(self, api_key: str = ""):
        self.api_key = api_key

    def reply(self, text: str):

        genai.configure(api_key=self.api_key)
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(f"{self.base_prompt} User: {text}")

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
