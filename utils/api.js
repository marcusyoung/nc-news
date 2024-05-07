import axios from 'axios'

const newsAPI = axios.create({
    baseURL: "https://nc-news-api-fa1t.onrender.com/api"
})

export function getAllArticles() {
    return newsAPI.get("/articles");
}