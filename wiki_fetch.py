import requests

def fetch_summary(topic):
    url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{topic.replace(' ', '_')}"
    res = requests.get(url)
    if res.status_code == 200:
        data = res.json()
        return {
            "code": f"USL[Topic]: {data['title']}\nUSL[Define]: {data['extract']}"
        }
    else:
        return {"code": f"USL[Topic]: {topic}\nUSL[Define]: [Error fetching summary]"}
