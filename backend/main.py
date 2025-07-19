from fastapi import FastAPI, Body
from pydantic import BaseModel
import openai
import os
from fastapi.middleware.cors import CORSMiddleware

openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class BioInput(BaseModel):
    bio: str

class ReplyInput(BaseModel):
    message: str
    intent: str

class AskOutInput(BaseModel):
    convo: str
    tone: str

@app.post("/analyze-bio")
def analyze_bio(data: BioInput):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a witty dating assistant."},
            {"role": "user", "content": f"Based on this Tinder bio: '{data.bio}', give me 3 unique opening lines."}
        ]
    )
    return {"lines": response['choices'][0]['message']['content']}

@app.post("/suggest-reply")
def suggest_reply(data: ReplyInput):
    prompt = f"I'm chatting on Tinder. They said: '{data.message}'. My intent is to '{data.intent}'. Suggest 3 flirty/funny replies."
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )
    return {"replies": response['choices'][0]['message']['content']}

@app.post("/ask-out")
def ask_out(data: AskOutInput):
    prompt = f"This is my Tinder chat: '{data.convo}'. Suggest a cool, smooth, and {data.tone} way to ask them out."
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )
    return {"askout_line": response['choices'][0]['message']['content']}
