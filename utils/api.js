import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL

const newsAPI = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
})

const getCookie = (name) => {
    const cookies = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${name}=`));

    return cookies ? cookies.split("=")[1] : null;
};


// if we have a csrf-token cookie add it to request header
newsAPI.interceptors.request.use(config => {
    const xsrfToken = getCookie("csrf-token");
    if (xsrfToken) {
        config.headers['X-XSRF-TOKEN'] = xsrfToken
    }
    return config
},
    error => {
        return Promise.reject(error)
    }
);


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


// must have a token to get user information
export function getUser(username) {
    return newsAPI.get(`/users/${username}`)
        .then((response) => {
            return response.data.user
        })
}


// must have a token to vote on an article
export function voteForArticle(article_id, vote) {
    return newsAPI.patch(`/articles/${article_id}`, vote)
        .then((response) => {
            return response.data.article
        })
}

// must have a token to post comments
export function addArticleComment(article_id, comment) {
    return newsAPI.post(`/articles/${article_id}/comments`, comment)
        .then((response) => {
            return response.data.comment
        })
}

// must have a token to delete comments
export function deleteArticleComment(comment_id) {
    return newsAPI.delete(`/comments/${comment_id}`)
        .then((response) => {
            return response
        })
}


// must have a token to vote on an article
export function voteForComment(comment_id, vote) {
    console.log(comment_id, ' ', vote)
    return newsAPI.patch(`/comments/${comment_id}`, vote)
        .then((response) => {
            return response.data.comment
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

export function logoutUser() {
    return newsAPI.post("/users/logout")
        .then((response) => {
            return response
        })
}