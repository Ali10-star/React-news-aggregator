// const CORS_ANYWHERE = "https://cors-anywhere.herokuapp.com/";
const CORS_ANYWHERE = "";
const BASE = CORS_ANYWHERE + `https://newsapi.org/v2`;
const buildUri = ({ baseURL = BASE, endpoint = `/top-headlines`, queryParams = [] }) => {
    let uri = baseURL + endpoint;
    if (queryParams) {
        uri += `/?${queryParams[0][0]}=${queryParams[0][1]}`;
        for (let i = 1; i < queryParams.length; i++) {
            uri += `&${queryParams[i][0]}=${queryParams[i][1]}`;
        }
    }
    return uri;
}

export default buildUri;