# main.py (python example)
import requests

import os
from dotenv import load_dotenv

from deepgram import (
    DeepgramClient,
    PrerecordedOptions,
    FileSource,
)

load_dotenv()

# Path to the audio file
AUDIO_FILE = "test.m4a"
API_KEY = os.getenv("DG_API_KEY")
API_KEY_HYP = os.getenv("HYPERBOLIC_KEY")

def speech_to_text(audio_file):
    try:
        # STEP 1 Create a Deepgram client using the API key
        deepgram = DeepgramClient(API_KEY)

        with open(audio_file, "rb") as file:
            buffer_data = file.read()

        payload: FileSource = {
            "buffer": buffer_data,
        }

        #STEP 2: Configure Deepgram options for audio analysis
        options = PrerecordedOptions(
            model="nova-2",
            smart_format=True,
        )

        # STEP 3: Call the transcribe_file method with the text payload and options
        response = deepgram.listen.prerecorded.v("1").transcribe_file(payload, options)

        # STEP 4: Print the response
        return response["results"]["channels"][0]["alternatives"][0]["transcript"]

    except Exception as e:
        print(f"Exception: {e}")

def get_coordinate_date(text):
    url = "https://api.hyperbolic.xyz/v1/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + API_KEY_HYP
    }
    data = {
        "messages": [
            {
                "role": "system",
                "content": "You are an interpreter. Your job is to interpret \"dialogues\" from humans. The dialogues be in the form of reports where the report will contain a location and a report of some sort. Your job is get the coordinates of the location and you're gonna rate the report (based on how bad it is) from 1-10."
            },
            {
                "role": "user",
                "content": """
                Give me the longitude and latitude of the location mentioned in this article. Also give me the rating from 1-10 of how bad the situation is in the article, 1 is just minor petty crime, 10 is the worst crime. Also give me a one sentence summary of the text. Start with the longitude, then the next will be the latitude, then next will be the rating, the last would be the summary. Remember, i only need the four values, nothing else! Structure it this way: "longitude, latitude, rating, summary". Here's the text: """ + text + " remember, i only need four values. longitude, latitude, and summary. the summary should be STRICTLY one sentence ONLY. do not create unecessary breaks. it should look like an array with 4 values: \"long, lat, rating, summary\""
            }
        ],
        "model": "meta-llama/Llama-3.2-3B-Instruct",
        "max_tokens": 512,
        "temperature": 0,
        "top_p": 0.9
    }

    response = requests.post(url, headers=headers, json=data)
    return (response.json())
