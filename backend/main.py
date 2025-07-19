from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
import os

# 🔐 Load OpenAI API key
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# 🚀 Init FastAPI app
app = FastAPI()

# 🔄 CORS for frontend usage
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production: ["https://yourfrontend.com"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1️⃣ Analyze Tinder Bio → Generate Flirty Opener
@app.post("/analyze-bio")
async def analyze_bio(request: Request):
    data = await request.json()
    bio = data.get("bio", "")

    if not bio:
        return {"error": "No bio provided."}

    prompt = f"""You're a dating AI coach. Analyze this Tinder bio and generate a clever, flirty, and funny first message to start a conversation:\n\n"{bio}"\n\nKeep it casual and creative:"""

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=100,
            temperature=0.85,
        )
        return {"reply": response.choices[0].message.content.strip()}
    except Exception as e:
        return {"error": str(e)}


# 2️⃣ Suggest a Reply → Based on Their Message
@app.post("/suggest-reply")
async def suggest_reply(request: Request):
    data = await request.json()
    message = data.get("message", "")

    if not message:
        return {"error": "No message provided."}

    prompt = f"""You're a dating expert AI. Given this message received on Tinder:\n\n"{message}"\n\nCraft a witty, fun, and engaging reply that keeps the conversation going:"""

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=100,
            temperature=0.85,
        )
        return {"reply": response.choices[0].message.content.strip()}
    except Exception as e:
        return {"error": str(e)}


# 3️⃣ Ask Them Out → Based on Chat Context
@app.post("/ask-out")
async def ask_out(request: Request):
    data = await request.json()
    context = data.get("context", "")

    if not context:
        return {"error": "No context provided."}

    prompt = f"""You're an AI trained in modern dating dynamics. Based on this Tinder conversation:\n\n{context}\n\nSuggest a smooth, confident way to ask them out in a non-creepy, charming way. Avoid being too forward or generic. Be human and a little playful:"""

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=100,
            temperature=0.9,
        )
        return {"reply": response.choices[0].message.content.strip()}
    except Exception as e:
        return {"error": str(e)}
