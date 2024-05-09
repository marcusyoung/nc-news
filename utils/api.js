import axios from 'axios'

const newsAPI = axios.create({
    baseURL: "https://nc-news-api-fa1t.onrender.com/api"
})

export function getAllArticles(topic) {
    return newsAPI.get("/articles", {params: {topic: topic}})
        .then((response) => {
            return response.data.articles
        });
}

export function getArticle(article_id) {
    return newsAPI.get(`/articles/${article_id}`,)
        .then((response) => {
            return response.data.article
        });
}

export function getComments(article_id) {
    return newsAPI.get(`/articles/${article_id}/comments`,)
        .then((response) => {
            return response.data.comments
        });
}

export function voteForArticle(article_id, vote) {
    return newsAPI.patch(`/articles/${article_id}`, vote)
        .then((response) => {
            return response.data.article
        })
}

export function addArticleComment(article_id, comment) {
    return newsAPI.post(`/articles/${article_id}/comments`, comment)
    .then((response) => {
        return response.data.comment
    })
}

export function deleteArticleComment(comment_id) {
    return newsAPI.delete(`/comments/${comment_id}`)
    .then((response) => {
        return response
    })
}

export function getTopicsList() {
    return newsAPI.get("/topics")
        .then((response) => {
            return response.data.topics
        });
}