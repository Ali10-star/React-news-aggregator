// https://newsapi.org/v2/top-headlines/sources/?apiKey=042b9d9675d74212965605723d9ee44b

const API_KEY = process.env.REACT_APP_API_KEY;
const CORS_ANYWHERE = "https://cors-anywhere.herokuapp.com/";
const url = CORS_ANYWHERE + 'https://newsapi.org/v2/top-headlines/sources/';

async function getNewsSources() {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            "X-Api-Key": `${API_KEY}`,
            "Access-Control-Allow-Origin": "*"
        }
    });
    const data = await response.json();
    const sourcesData = data["sources"];
    if (!sourcesData) {
        return [];
    }
    const sources = sourcesData.map((source) => {
        return {
            id: source.id,
            name: source.name,
            country: source.country,
            url: source.url
        }
    });
    // console.log(sources);
    return sources;
}

export default getNewsSources;