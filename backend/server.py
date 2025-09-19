import os
import requests
import google.generativeai as genai
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles


app = FastAPI()

# Enable CORS (so React can call this API)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 👈 change to ["http://localhost:5173"] for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.5-flash")

GOOGLE_PLACES_API_KEY = os.getenv("GOOGLE_PLACES_API_KEY")

@app.post("/chat")
async def chat(request: Request):
    try:
        data = await request.json()
        user_message = data.get("message", "")
        lat = data.get("lat")
        lng = data.get("lng")

        if not user_message:
            return {"error": "Message is required"}
        
        # 🔹 Fetch nearby places if we have location
        places_text = ""
        if lat and lng:
            url = (
                f"https://maps.googleapis.com/maps/api/place/nearbysearch/json"
                f"?location={lat},{lng}&radius=3000&type=tourist_attraction&key={GOOGLE_PLACES_API_KEY}"
            )
            resp = requests.get(url)
            results = resp.json().get("results", [])

            if results:
                places = [place["name"] for place in results[:5]]
                places_text = "Nearby tourist attractions: " + ", ".join(places)
            # 🔹 Ask Gemini to craft a nice response
        prompt = f"""
        User asked: {user_message}
        User location: {lat}, {lng}
        {places_text if places_text else "No nearby attractions found."}

        Reply in a friendly chatbot style.
        """
        response = model.generate_content(prompt)
        reply = response.text

        return {"reply": reply}

    except Exception as e:
        print("Error:", e)
        return {"error": "Failed to generate response"}
app.mount("/", StaticFiles(directory="static", html=True), name="static")