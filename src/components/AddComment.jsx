import { useContext, useState } from 'react'
import { LoggedOnUserContext } from '../contexts/LoggedOnUser'
import { addArticleComment } from '../../utils/api'

function AddComment({ article_id, setTriggerReload}) {

    const { loggedOnUser } = useContext(LoggedOnUserContext)
    const [commentText, setCommentText] = useState("")
    const [errorMessage, setErrorMessage] = useState('')

    function handleSubmit(event) {
        event.preventDefault()
        if (loggedOnUser) {
            addArticleComment(article_id, { username: loggedOnUser, body: commentText })
                .then(() => {
                   setTriggerReload((current) => current + 1) 
                })
                .catch(error => {
                    setErrorMessage("Oops... there was a problem adding your comment")
                })
        } else {
            setErrorMessage("Sorry... you must be logged on to comment")
        }
    }

    return (
        <section>
            <form onSubmit={handleSubmit} id="add-comment-form">
                <label id="add-comment-label" htmlFor='add-comment'>Add a comment</label>
                <textarea onChange={(e) => setCommentText(e.target.value)} value={commentText} id="add-comment-textarea" rows="3"></textarea>
                <button type="reset">Cancel</button>
                <button type="submit">Create</button>
            </form>
            {errorMessage && <p className='error'> {errorMessage} </p>}
        </section>
    )
}

export default AddComment