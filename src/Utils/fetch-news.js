import getClientCountryInfo from "./country-codes";
import buildUri from "./uri-builder";

const API_KEY = process.env.REACT_APP_API_KEY;
const { countryCode } = getClientCountryInfo();

const REQUEST_DATA = {
    method: 'GET',
    headers: {
        "X-Api-Key": `${API_KEY}`,
        "Access-Control-Allow-Origin": "*"
     }
};

async function getTrendingNews(queryParams = [["country", `${countryCode}`]]) {
    const uri = buildUri({ queryParams: queryParams });

    const response = await fetch(uri, REQUEST_DATA);
    const data = await response.json();
    const articles = data["articles"];

    return articles;
}

async function getTrendingNewsByTopic(topic) {
    return await getTrendingNews([
        ["country", `${countryCode}`],
        ["category", topic],
    ]);
}

async function searchNews(query) {
    const uri = buildUri({
        endpoint: '/everything',
        queryParams: [
            ["sortBy", `relevancy`],
            ['q', query],
        ]
    });
    const response = await fetch(uri, REQUEST_DATA);
    const data = await response.json();
    const resultCount = data['totalResults'];
    let articles = [];
    if (resultCount > 0) {
        articles = data['articles'];
    }
    console.log("Articles from searchNews: ", articles);
    return { resultCount, articles };
}

async function getTrendingSportsNews() {
    return await getTrendingNewsByTopic('sports');
}

async function getTrendingScienceNews() {
    return await getTrendingNewsByTopic('science');
}

async function getTrendingNewsBySource(source) {
    return await getTrendingNews([
        ['sources', source]
    ]);
}

export { getTrendingNews,
         getTrendingSportsNews,
         getTrendingScienceNews,
         getTrendingNewsByTopic,
         searchNews,
        getTrendingNewsBySource };