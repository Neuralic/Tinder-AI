from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
import os
from deepface import DeepFace
import base64
import tempfile
from PIL import Image
from io import BytesIO

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

    prompt = f"""You're a dating AI coach. Analyze this Tinder bio and generate a clever, flirty, and funny first message to start a conversation:\n\n\"{bio}\"\n\nKeep it casual and creative:"""

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

    prompt = f"""You're a dating expert AI. Given this message received on Tinder:\n\n\"{message}\"\n\nCraft a witty, fun, and engaging reply that keeps the conversation going:"""

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

# 4️⃣ Analyze Profile Picture + User Info
@app.post("/analyze-profile")
async def analyze_profile(request: Request):
    data = await request.json()

    image_base64 = data.get("image")
    name = data.get("name")
    age = data.get("age")
    user_gender = data.get("gender")
    goals = data.get("goals")
    confidence = data.get("confidence")

    if not image_base64:
        return {"error": "Image required."}

    try:
        image_data = base64.b64decode(image_base64)
        image = Image.open(BytesIO(image_data))
        with tempfile.NamedTemporaryFile(suffix=".jpg", delete=False) as tmp:
            image_path = tmp.name
            image.save(image_path)

        analysis = DeepFace.analyze(img_path=image_path, actions=["emotion", "age", "gender", "race"], enforce_detection=False)[0]

        age_estimate = analysis.get("age")
        gender_detected = analysis.get("dominant_gender")
        emotion = analysis.get("dominant_emotion")
        race = analysis.get("dominant_race")
        expression = analysis.get("emotion", {})
        smile_score = expression.get("happy", 0.0) / 100

        prompt = f"""
You are a world-class dating coach and image consultant. A user has uploaded a Tinder profile picture, and here are the visual analysis results and profile details:

📸 **Image Analysis**
- Age estimate: {age_estimate}
- Gender detected: {gender_detected}
- Emotion: {emotion}
- Dominant race: {race}
- Smile: {'Yes' if smile_score > 0.5 else 'No'}

🧾 **User Info**
- Name: {name or 'Unknown'}
- Age: {age or 'Unknown'}
- Gender: {user_gender or 'Not specified'}
- Dating Goals: {goals or 'Not specified'}
- Confidence Rating (Self-reported): {confidence or 'Not shared'}

---

💡 Based on this, provide:
1. A **short first impression** (tone: friendly but professional)
2. A **constructive photo critique** (lighting, angle, outfit, vibe, smile)
3. Suggestions to **improve their profile pictures** (actionable)
4. A **tailored bio line** that matches their goals + vibe
5. A **match potential score** from 0–100 with a reasoned justification

Keep the tone casual, warm, confident, and encouraging. Avoid negativity — be honest but supportive.
"""

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=600,
            temperature=0.85,
        )
        return {"feedback": response.choices[0].message.content.strip()}

    except Exception as e:
        return {"error": str(e)}
