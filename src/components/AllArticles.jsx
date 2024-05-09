import { useState, useEffect } from "react"
import { Link, useSearchParams } from 'react-router-dom';
import { getAllArticles } from "../../utils/api"

function AllArticles() {

    const [articlesList, setArticlesList] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()

    const topic = searchParams.get("topic")

    useEffect(() => {
        setLoading(true)
        getAllArticles(topic)
            .then((articles) => {
                setLoading(false)
                setArticlesList(articles)
            })
    }, [topic])

    if (loading) {
        return <p>Please wait...</p>
    }

    return (
        <>
            {topic ? <h1>Articles - {topic}</h1>: <h1>All Articles</h1>}
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