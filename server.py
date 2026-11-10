import os
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

mongo_url = os.getenv("MONGO_URL", "mongodb://localhost:27017")
db_name = os.getenv("DB_NAME", "sj_cranes_services")
client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

app = FastAPI(title="SJ Cranes Services API", version="1.0.0")
origins = os.getenv("CORS_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QuoteRequest(BaseModel):
    customer_name: str = Field(min_length=1)
    company_name: str = ""
    phone: str = Field(min_length=7)
    email: str = ""
    location: str = Field(min_length=1)
    crane_type: str = Field(min_length=1)
    capacity: str = Field(min_length=1)
    project_date: str = ""
    requirements: str = Field(min_length=1)
    message: str = ""

@app.get("/api/")
async def root():
    return {"message": "SJ Cranes Services API is running"}

@app.post("/api/quotes")
async def create_quote(request: QuoteRequest):
    doc = request.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.quotes.insert_one(doc)
    return {"success": True, "id": doc["id"], "message": "Quote enquiry received."}

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
