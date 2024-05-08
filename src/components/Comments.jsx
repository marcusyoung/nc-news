import { getComments } from '../../utils/api'
import { useState, useEffect } from "react"
import { formatDate} from "../../utils/utils.js"
import Votes from './Votes.jsx'

function Comments({ article_id }) {

    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        getComments(article_id)
            .then((comments) => {
                setLoading(false)
                setComments(comments)
            })
    }, [article_id])

    if (loading) {
        return <p>Please wait...</p>
    }

    return (
            <section className="article-comments">
                <h2>Comments</h2>
                {
                    comments.map((comment) => {
                        return (
                            <div className="article-comment" key={comment.comment_id}>
                                <ul className='comment-details'>
                                    <li>{comment.author}</li>
                                    <li>{formatDate(comment.created_at)}</li>
                                </ul>
                                <p>{comment.body}</p>
                                <Votes itemVotes={comment.votes} comment_id={comment.comment_id}/>
                            </div>
                        )
                    })
                }
            </section>

    )
}

export default Comments