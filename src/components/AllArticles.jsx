import { useState, useEffect } from "react"
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { getAllArticles } from "../../utils/api"
import { formatDate } from "../../utils/utils";
import voteLogo from '../../assets/heart.png'
import commentLogo from '../../assets/comment.png'

function AllArticles() {

    const [articlesList, setArticlesList] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()
    const [sortBy, setSortBy] = useState("created_at")
    const [orderBy, setOrderBy] = useState("desc")
    const navigate = useNavigate();
    const topic = searchParams.get("topic")

    function handleSelectSort(value) {
        setSortBy(value)
    }

    function handleSelectOrder(value) {
        setOrderBy(value)
    }

    useEffect(() => {
        if (topic) {
            setSearchParams({ sort_by: sortBy, order_by: orderBy, topic: topic })
        } else {
            setSearchParams({ sort_by: sortBy, order_by: orderBy })
        }
        setLoading(true)
        getAllArticles(topic, sortBy, orderBy)
            .then((articles) => {
                setLoading(false)
                setArticlesList(articles)
            })
            .catch((error) => {
                navigate("/error", { state: { message: error.message } })
            })
    }, [topic, sortBy, orderBy])

    if (loading) {
        return <p>Please wait...</p>
    }

    return (
        <>
            {topic !== null ? <h1>Articles - {topic}</h1> : <h1>Articles</h1>}
            <form id="form-article-list-sort">
                <label htmlFor="article-column-sort">Sort: </label>
                <select value={sortBy} id="article-column-sort" onChange={(e) => handleSelectSort(e.target.value)}>
                    <option value="created_at">Date</option>
                    <option value="votes">Votes</option>
                    <option value="comment_count">Comments</option>
                </select>
                <select aria-label="set sort order" value={orderBy} id="article-column-order" onChange={(e) => handleSelectOrder(e.target.value)}>
                    <option value="asc">Up</option>
                    <option value="desc">Down</option>
                </select>
            </form>
            <section id="all-articles">
                {
                    articlesList.map((article) => {
                        return (
                            <article className="article-card" key={article.article_id}>
                                <ul className="article-list-details" key={article.article_id}>
                                    <li>{formatDate(article.created_at, "condensed")}</li>
                                    <li><img src={voteLogo} alt="Heart used to indicate number of votes an article has"></img>{article.votes}</li>
                                    <li><img src={commentLogo} alt="Speech bubble used to indicated number of comments an article has"></img>{article.comment_count}</li>
                                </ul>
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