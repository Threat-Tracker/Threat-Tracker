import requests
import os
from dotenv import load_dotenv
import newspaper
import re
import json
# Load environment variables from .env file
load_dotenv()

# Access the API key
api_key = os.getenv("HYPERBOLIC_API_KEY")


def scrape_website(url):
    # pip install newspaper4k
    # https://newspaper4k.readthedocs.io/en/latest/user_guide/quickstart.html

    # from geotext import GeoText
    article = newspaper.article(
        url)

    # print(article.authors)
    # ['Hannah Brewitt', 'Minute Read', 'Published', 'Am Edt', 'Sun October']

    # print(article.publish_date)
    # 2023-10-29 09:00:15.717000+00:00

    # print(article.text)
    # New England Patriots head coach Bill Belichick, right, embraces Buffalo Bills head coach Sean McDermott ...

    # print(article.top_image)
    # https://media.cnn.com/api/v1/images/stellar/prod/231015223702-06-nfl-season-gallery-1015.jpg?c=16x9&q=w_800,c_fill

    # print(article.movies)
    # []

    # article.nlp()

    # print(article.keywords)
    # ['broncos', 'game', 'et', 'wide', 'chiefs', 'mahomes', 'patrick', 'denver', 'nfl', 'stadium', 'week', 'quarterback', 'win', 'history', 'images']

    # try to get location and coordinates of location of crime described in article using llm

    # places = GeoText(article.text)
    # location = "San Francisco" if "San Francisco" in places.cities else "Unknown"
    # print(places.cities)
    # print(article.summary)
    return ("It happened at " + str(article.publish_date) + article.text)


def call_LLM(content):
    url = "https://api.hyperbolic.xyz/v1/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + api_key
    }
    data = {
        "messages": [
            {
                "role": "system",
                "content": "give me the coordinates , danger_score (1-10, one factor is the recency, todays date is October 19 2024), and summary of this event in an array ({})"
            },
            {
                "role": "user",
                "content": content
            }
        ],
        "model": "meta-llama/Llama-3.2-3B-Instruct",
        "max_tokens": 512,
        "temperature": 0.7,
        "top_p": 0.9
    }

    response = requests.post(url, headers=headers, json=data)
    print(response.json())
    return (findJSON(response.json()))


def extract_fields(data, keys_to_find):
    results = {}

    def recursive_search(data, current_path=None):
        if current_path is None:
            current_path = []

        if isinstance(data, dict):
            for key, value in data.items():
                new_path = current_path + [key]
                recursive_search(value, new_path)
        elif isinstance(data, list):
            for item in data:
                recursive_search(item, current_path)
        else:
            # Check if current key is in keys_to_find
            if current_path and current_path[-1] in keys_to_find:
                results[current_path[-1]] = data

    recursive_search(data)
    return results


def findJSON(result):
    # Specify the keys we are looking for
    keys_to_find = ["summary", "danger_score", "coordinates"]

    # Extract the fields
    for incident in result:
        extracted_data = extract_fields(incident, keys_to_find)
        return (extracted_data)


print(call_LLM(scrape_website(
    "https://www.cbsnews.com/sanfrancisco/news/san-francisco-police-arrest-man-suspected-of-attacking-2-senior-citizens/")))
# example url
# https://www.cbsnews.com/sanfrancisco/news/san-francisco-police-arrest-man-suspected-of-attacking-2-senior-citizens/
# example content
"""San Francisco police on Wednesday said they arrested a man who is suspected of attacking two senior citizens.

    On Tuesday, a 90-year-old man was on a Muni bus near Bryant and 3rd streets when a man "charged and attacked" him. Police said the suspect hit the 90-year-old several times and kicked him when he fell to the ground.

    The 90-year-old was seriously injured, and police said he was taken to the hospital with injuries that were life-threatening.

    The first attack happened around 10:20 a.m., and a second attack was reported about two hours later. Police said witnesses reported that a 68-year-old man who uses a walker was shoved to the ground at Hallidie Plaza, near Cyril Magnin and Eddy streets.

    According to police, the victim hit his head on the ground when he fell. He was taken to the hospital for injuries that were not life-threatening.

    Police said that, shortly after, officers spotted a man in UN Plaza who matched the suspect's description. The suspect was arrested after a brief chase, and police identified him as 27-year-old Jahad Antoine.

    He was arrested on suspicion of resisting or delaying arrest, elder abuse, assault likely to produce great bodily injury and various warrant violations.

    More booking charges were added when police suspected he was connected to the attack on the 90-year-old man. He also faces assault with a deadly weapon likely to produce great bodily injury, battery against an operator, driver or passenger on a bus, elder abuse, and inflicting great bodily injury on a person who is 70 years of age or older."""
