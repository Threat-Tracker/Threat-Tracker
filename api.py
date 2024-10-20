
import reflex as rx
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from fastapi import APIRouter
from typing import List
from dotenv import load_dotenv
from rxconfig import config

MONGO_URI = load_dotenv("MONGO_URI")

app = rx.App()
app.add_page(index)

api = app.api

router = APIRouter()

client = AsyncIOMotorClient(MONGO_URI, tlsAllowInvalidCertificates=True)
db = client['threattracker']  
collection = db['locations']  

class State(rx.State):
    """The app state."""

    ...


def index() -> rx.Component:
    # Welcome Page (Index)
    return rx.container(
        rx.color_mode.button(position="top-right"),
        rx.vstack(
            rx.heading("Threat Tracker API", size="9"),
            rx.text(
                "Connected to Mongo DB",
                rx.code(f"{config.app_name}/{config.app_name}.py"),
                size="5",
            ),
            spacing="5",
            justify="center",
            min_height="85vh",
        ),
        rx.logo(),
    ) 

class LocationData(BaseModel):
    latitude: float
    longitude: float
    weight: float
    summary: str

# Helper function to format MongoDB document ID for JSON responses
def item_helper(item) -> dict:
    return {
        "id": str(item["_id"]),
        "latitude": item["latitude"],
        "longitude": item["longitude"],
        "weight": item["weight"],
        "summary": item["summary"]
    }

### POST request to add data to the database ###
@router.post("/locations/")
async def add_location(data: LocationData):
    # Insert
    new_data = data.dict()
    result = await collection.insert_one(new_data)
    # Retrieve
    created_item = await collection.find_one({"_id": result.inserted_id})
    return item_helper(created_item)

@router.get("/locations", response_model=List[LocationData])
async def get_all_locations():
    all_locations = []
    cursor = collection.find({})  # Find
    async for document in cursor:
        all_locations.append(item_helper(document))
    return all_locations

@router.get("/test")
async def test():
    return "test complete"


app.api.include_router(router)
