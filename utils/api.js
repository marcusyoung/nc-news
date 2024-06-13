import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL

const newsAPI = axios.create({
    baseURL: baseURL
})

// newsAPI.interceptors.response.use((response) => {
//     return response;
// },
//     (error) => {
//         if (error.response && error.response.status === 401) {
//             console.log("in interceptor")
//             localStorage.removeItem('jwt-token')
//             // this will reload app but that is fine for simplicity
//             window.location.href = '/login';
//             return Promise.reject('Unauthorized')
//         } else {
//         return Promise.reject(error)
//         }
//     });


export function getAllArticles(topic, sort_by, order_by) {
    return newsAPI.get("/articles", { params: { topic: topic, sort_by: sort_by, order: order_by } })
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

// must have a token to vote on an article
export function voteForArticle(article_id, vote) {
    const token = localStorage.getItem('jwt-token')
    return newsAPI.patch(`/articles/${article_id}`, vote, {
        headers: {
            'jwt-token': token
        }
    })
        .then((response) => {
            return response.data.article
        })
}

// must have a token to post comments
export function addArticleComment(article_id, comment) {
    const token = localStorage.getItem('jwt-token')
    return newsAPI.post(`/articles/${article_id}/comments`, comment, {
        headers: {
            'jwt-token': token
        }
    })
        .then((response) => {
            return response.data.comment
        })
}

// must have a token to delete comments
export function deleteArticleComment(comment_id) {
    const token = localStorage.getItem('jwt-token')
    const headers = {
        'jwt-token': token
    }
    return newsAPI.delete(`/comments/${comment_id}`, { headers }, {
    })
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

export function createUser(body) {
    return newsAPI.post("/users/signup", body)
        .then((response) => {
            return response
        })
}