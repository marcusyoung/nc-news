import { useContext, useState } from 'react'
import { LoggedOnUserContext } from '../contexts/LoggedOnUser'
import { addArticleComment } from '../../utils/api'
import { useNavigate } from 'react-router-dom'

function AddComment({ article_id, comments, setComments }) {

    const { loggedOnUser, setLoggedOnUser } = useContext(LoggedOnUserContext)
    const [commentText, setCommentText] = useState("")
    const [statusMessage, setStatusMessage] = useState('')
    const navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault()
        if (loggedOnUser) {
            setStatusMessage("Posting comment...")
            addArticleComment(article_id, { username: loggedOnUser, body: commentText })
                .then((comment) => {
                    const updatedComments = [comment, ...comments]
                    setComments(updatedComments)
                    setCommentText("")
                    setStatusMessage('')
                })
                .catch(error => {
                    if (error.response.status && error.response.status === 403) {
                        setLoggedOnUser('')
                        navigate('/login')
                    } else {
                        setStatusMessage("Oops... there was a problem adding your comment")
                    }
                })
        } else {
            setStatusMessage("Sorry... you must be logged on to comment")
        }
    }

    function handleCancel() {
        setCommentText("")
        setStatusMessage("")
    }

    return (
        <section>
            <form onSubmit={handleSubmit} id="add-comment-form">
                <label id="add-comment-label" htmlFor='add-comment-text'>Add a comment</label>
                <textarea onChange={(e) => setCommentText(e.target.value)} value={commentText} id="add-comment-text" rows="5"></textarea>
                <button disabled={commentText.length < 1} onClick={handleCancel}>Cancel</button>
                <button disabled={(commentText.length < 1 || statusMessage === "Posting comment...")} type="submit" id="add-comment-submit">Add comment</button>
            </form>
            {statusMessage && <p className='status'> {statusMessage} </p>}
        </section>
    )
}

export default AddComment