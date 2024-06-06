import axios from 'axios'
import { Link, useSearchParams } from 'react-router-dom';

const baseURL = import.meta.env.VITE_API_BASE_URL

const newsAPI = axios.create({
    baseURL: baseURL
})

export function getAllArticles(topic, sort_by, order_by) {
    return newsAPI.get("/articles", {params: {topic: topic, sort_by: sort_by, order: order_by}})
        .then((response) => {
            return response.data.articles
        })
        ;
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

export function authUser(body) {
    return newsAPI.post("/users/login", body)
    .then((response) => {
        return response
    })

}