from newspaper import Config
from newspaper import Article
import json
from dotenv import load_dotenv
import requests

USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:78.0) Gecko/20100101 Firefox/78.0'
API_KEY = load_dotenv("HYPERBOLIC_KEY")

config = Config()
config.browser_user_agent = USER_AGENT
config.request_timeout = 10

def scrape_news(url):

    try:
        article = Article(url, config=config)
        article.download()
        article.parse()
        # return article.title, article.publish_date, article.text
        return article.text

    except Exception as error:
        print(error)

def get_coordinate_date(text):
    url = "https://api.hyperbolic.xyz/v1/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + API_KEY
    }
    data = {
        "messages": [
            {
                "role": "system",
                "content": "You are a surveyor that converts location names into coordinate values while also rating how bad a certain situation is while also providing a one sentence summary of a story. These values will be used to save lives. You will only give me the longitude latitude, rating (from 1-10), and a one sentence summary and nothing else."
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
