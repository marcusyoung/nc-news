import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import { getAllArticles } from "../../utils/api"

function AllArticles() {

    const [articlesList, setArticlesList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        getAllArticles()
            .then((articles) => {
                setLoading(false)
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
                            <article className="article-card" key={article.article_id}>
                                <Link to={`/articles/${article.article_id}`}>
                                <img src={article.article_img_url}></img>
                                <h2>{article.title}</h2>
                                </Link>
                            </article>
                        )
                    })
                }
            </section>
        </>
    )
}

export default AllArticles