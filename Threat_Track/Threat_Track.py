import reflex as rx
from Threat_Track.backend import call_LLM, scrape_website

def api_test(url: str = ""):
    scraped_content = scrape_website(url)
    llm_result = call_LLM(scraped_content)
    return {"result": llm_result}

app = rx.App()
app.api.add_api_route("/process_url", api_test)