import { useState, useEffect } from "react"
import { getAllArticles } from "../../utils/api"

function AllArticles() {

    const [articlesList, setArticlesList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        getAllArticles()
            .then((response) => {
                setLoading(false)
                const articles = response.data.articles
                setArticlesList(articles)
            })
    }, [])

    if (loading) {
        return <p>Please wait...</p>
    }

    return (
        <>
            <h1>All Articles</h1>
            <section id="all-articles">
                {
                    articlesList.map((article) => {
                        return (
                            <article key={article.article_id}>
                                <img src={article.article_img_url}></img>
                                <h2>{article.title}</h2>
                            </article>
                        )
                    })
                }
            </section>
        </>
    )
}

export default AllArticles