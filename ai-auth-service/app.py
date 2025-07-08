from pymongo import MongoClient
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

app = FastAPI()

# ✅ Connect to MongoDB
client = MongoClient("mongodb://localhost:27017")
db = client["lending_platform"]  # You can name it as per your project
users_collection = db["users"]

THRESHOLD = 0.9  # Adjust if needed

class AuthData(BaseModel):
    username: str
    typingPattern: list

@app.post("/verify-typing")
def verify_typing(data: AuthData):
    user = users_collection.find_one({"username": data.username})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user_pattern = user.get("typingPattern")
    if not user_pattern:
        raise HTTPException(status_code=400, detail="Stored typing pattern missing")

    if not data.typingPattern or len(data.typingPattern) == 0:
        raise HTTPException(status_code=400, detail="Typing pattern is empty")

    if len(data.typingPattern) != len(user_pattern):
        raise HTTPException(status_code=400, detail="Typing pattern length mismatch")

    pattern1 = np.array(data.typingPattern).reshape(1, -1)
    pattern2 = np.array(user_pattern).reshape(1, -1)
    similarity = cosine_similarity(pattern1, pattern2)[0][0]
    print(f"Similarity: {similarity}")

    if similarity >= THRESHOLD:
        return {"result": "success", "similarity": similarity}
    else:
        raise HTTPException(status_code=401, detail="Typing pattern mismatch")
