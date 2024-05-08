import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getArticle } from '../../utils/api'
import vote from '../../assets/wish-list.png'
import Comments from './Comments'
import { formatDate } from "../../utils/utils.js"
import Votes from './Votes.jsx'

function Article() {

    const { article_id } = useParams()
    const [article, setArticle] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        getArticle(article_id)
            .then((article) => {
                setLoading(false)
                setArticle(article)
            })
    }, [article_id])

    if (loading) {
        return <p>Please wait...</p>
    }

    return (
        <>
            <article className='full-article'>
                <h2>{article.title}<span className='topic-badge'>{article.topic.toUpperCase()}</span></h2>
                <img src={article.article_img_url}></img>
                <ul key={article.artcile_id} className="article-details">
                    <li>By {article.author}</li>
                    <li>{formatDate(article.created_at)}</li>
                </ul>
                <p>{article.body}</p>
                <Votes itemVotes={article.votes} article_id={article_id}/>
            </article>
            <section>
                <Comments article_id={article_id} />
            </section>
        </>
    )
}

export default Article