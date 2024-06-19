import { useState, useEffect, useContext } from "react"
import { useNavigate } from 'react-router-dom'
import { LoggedOnUserContext } from '../contexts/LoggedOnUser'
import { getComments } from '../../utils/api'
import { formatDate } from "../../utils/utils.js"
import Votes from './Votes.jsx'
import AddComment from './AddComment.jsx'
import { deleteArticleComment } from '../../utils/api'

function Comments({ article_id }) {

    const { loggedOnUser, setLoggedOnUser } = useContext(LoggedOnUserContext)
    const navigate = useNavigate()
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const [commentDeleteStatus, setCommentDeleteStatus] = useState({ comment_id: null, message: '' })

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

    function handleDeleteComment(comment_id) {
        setCommentDeleteStatus({ comment_id: Number(comment_id), message: "Deleting comment..." })
        deleteArticleComment(comment_id)
            .then((response) => {
                const updatedComments = [...comments].filter((comment) => comment.comment_id != comment_id)
                setComments(updatedComments)
                setCommentDeleteStatus({ comment_id: null, message: "" })
            })
            .catch(error => {
                if (error.response.status && error.response.status === 403) {
                    setLoggedOnUser('')
                    navigate('/login')
                } else {
                    setCommentDeleteStatus({ comment_id: Number(comment_id), message: "Oops... there was a problem deleting the comment" })
                }
            })
    }

    return (
        <section className="article-comments">
            <h2>Comments</h2>
            <AddComment article_id={article_id} comments={comments} setComments={setComments} />
            {
                comments.map((comment) => {
                    return (
                        <div className="article-comment" key={comment.comment_id}>
                            <ul className='comment-details'>
                                <li>{comment.author}</li>
                                <li>{formatDate(comment.created_at)}</li>
                                {loggedOnUser === comment.author ? <li><button value={comment.comment_id} className="button-comment-delete" onClick={(e) => handleDeleteComment(e.target.value)} disabled={(comment.comment_id === commentDeleteStatus.comment_id && commentDeleteStatus.message === "Deleting comment...")}>delete</button></li> : null}
                                {comment.comment_id === commentDeleteStatus.comment_id ? <li className="status">{commentDeleteStatus.message}</li> : null}
                            </ul>
                            <p>{comment.body}</p>
                            <Votes itemVotes={comment.votes} comment_id={comment.comment_id} />
                        </div>
                    )
                })
            }
        </section>

    )
}

export default Comments