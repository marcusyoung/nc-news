import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getArticle } from '../../utils/api'
import format from "date-fns/format"
import vote from '../../assets/wish-list.png'

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
                console.log(article)
            })
    }, [article_id])

    if (loading) {
        return <p>Please wait...</p>
    }

    return (
        <>
            <article className='full-article'>
                <h2>{article.title}<span className='topic-badge'>{article.topic.toUpperCase()}</span></h2>
                <ul className="article-details">
                    <li>{article.author}</li>
                    <li>{format(article.created_at, "E dd MMMM yyyy hh:mm bb")}</li>
                </ul>
                <p>{article.body}</p>
                <div id="votes">
                    <img src={vote} alt="Vote for article" />
                    {article.votes}
                </div>
            </article>
        </>
    )
}

export default Article