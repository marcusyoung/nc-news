import vote_plus from '../../assets/heart-plus.png'
import vote_minus from '../../assets/heart-minus.png'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoggedOnUserContext } from '../contexts/LoggedOnUser'
import { voteForArticle } from '../../utils/api'

function Votes({ itemVotes, article_id, comment_id }) {

    const { loggedOnUser, setLoggedOnUser } = useContext(LoggedOnUserContext)
    const navigate = useNavigate()
    const [votes, setVotes] = useState(itemVotes)
    const [statusMessage, setStatusMessage] = useState('')


    const handleVoteClick = (num) => {
        setStatusMessage('')
        if (loggedOnUser) {
            if (article_id) {
                // optimistically update vote count
                setVotes((current) => current + num)
                voteForArticle(article_id, { inc_votes: num })
                    .catch(error => {
                        // undo vote if vote increment failed on backend
                        setVotes((current) => current - num)
                        if (error.response.status && error.response.status === 403) {
                            setLoggedOnUser('')
                            navigate('/login')
                        } else {
                        setStatusMessage("Oops... there was a problem voting")
                        }
                    })
            }
        } else {
            setStatusMessage("Sorry... you must be logged on to vote")
        }
    }

    return (
        <div className="votes">
            <img onClick={() => handleVoteClick(1)} src={vote_plus} alt="Vote" />
            {votes >= 0 ? votes : null}
            <img onClick={() => handleVoteClick(-1)} src={vote_minus} alt="Vote" />
            {votes < 0 ? votes : null}
            {statusMessage && <span className='error'> {statusMessage} </span>}
        </div>
    )
}

export default Votes