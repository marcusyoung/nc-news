import axios from 'axios'

const newsAPI = axios.create({
    baseURL: "https://nc-news-api-fa1t.onrender.com/api"
})

export function getAllArticles() {
    return newsAPI.get("/articles")
    .then((response) => {
        return response.data.articles
    } );
}

export function getArticle(article_id) {
    return newsAPI.get(`/articles/${article_id}`, )
    .then((response) => {
        return response.data.article
    });
}

export function getComments(article_id) {
    return newsAPI.get(`/articles/${article_id}/comments`, )
    .then((response) => {
        return response.data.comments
    });
}