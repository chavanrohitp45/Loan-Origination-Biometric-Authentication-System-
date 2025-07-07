from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

app = FastAPI()

# Simulated Stored Typing Patterns per User (Replace later with DB)
stored_patterns = {
    "golu": [180, 190, 564, 2622, 106, 168, 135, 681, 118, 310, 159, 564, 462, 202, 203]  # Sample pattern for user 'golu'
}

THRESHOLD = 0.9  # Adjust based on experiments

class AuthData(BaseModel):
    username: str
    typingPattern: list

@app.post("/verify-typing")
def verify_typing(data: AuthData):
    user_pattern = stored_patterns.get(data.username)
    if not user_pattern:
        raise HTTPException(status_code=404, detail="User not found")

    # ✅ Empty Check:
    if not data.typingPattern or len(data.typingPattern) == 0:
        raise HTTPException(status_code=400, detail="Typing pattern is empty")
    
    print(data.typingPattern)

    # ✅ Length Check:
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
