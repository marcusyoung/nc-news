import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getArticle, voteForArticle } from '../../utils/api'
import Comments from './Comments'
import { formatDate } from "../../utils/utils.js"
import Votes from './Votes.jsx'

function Article() {

    const { article_id } = useParams()
    const [article, setArticle] = useState({})
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        getArticle(article_id)
            .then((article) => {
                setLoading(false)
                setArticle(article)
            })
            .catch((error) => {
                navigate("/error", { state: { message: error.message } })
            })
    }, [article_id])

    if (loading) {
        return <p>Please wait...</p>
    }

    return (
        <>
            <article className='full-article'>
                <h1>{article.title}<span className='topic-badge'>{article.topic.toUpperCase()}</span></h1>
                <img src={article.article_img_url}></img>
                <ul key={article.article_id} className="article-details">
                    <li>By {article.author}</li>
                    <li>{formatDate(article.created_at)}</li>
                </ul>
                <p>{article.body}</p>
                <Votes voteFor={voteForArticle} itemVotes={article.votes} id={article_id} author={article.author}/>
            </article>
            <section>
                <Comments article_id={article_id} />
            </section>
        </>
    )
}

export default Article