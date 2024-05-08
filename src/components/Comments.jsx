import { getComments } from '../../utils/api'
import { useState, useEffect } from "react"
import vote from '../../assets/wish-list.png'
import { formatDate} from "../../utils/utils.js"

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
                                <div id="votes">
                                    <img src={vote} alt="Vote for comment" />
                                    {comment.votes}
                                </div>
                            </div>
                        )
                    })
                }
            </section>
    )
}

export default Comments