import vote_plus from '../../assets/heart-plus.png'
import vote_minus from '../../assets/heart-minus.png'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoggedOnUserContext } from '../contexts/LoggedOnUser'

function Votes({ voteFor, itemVotes, id, author }) {
    const { loggedOnUser, setLoggedOnUser } = useContext(LoggedOnUserContext)
    const navigate = useNavigate()
    const [votes, setVotes] = useState(itemVotes)
    const [statusMessage, setStatusMessage] = useState('')
    const [voteTracker, setVoteTracker] = useState(0)

    const handleVoteClick = (num, action) => {
        if (loggedOnUser) {
            if ((action === 'upVote' && voteTracker < 1) || (action === 'downVote' && voteTracker > -1)) {
                // optimistically update vote count
                setVotes((current) => current + num)
                setVoteTracker((current) => current + num)
                voteFor(id, { inc_votes: num })
                    .catch(error => {
                        // undo vote if vote increment failed on backend
                        setVotes((current) => current - num)
                        setVoteTracker((current) => current - num)
                        if (error.response.status && error.response.status === 403) {
                            setLoggedOnUser('')
                            navigate('/login')
                        } else if (error.response.status && error.response.status === 400) {
                            setStatusMessage(error.response.data.msg)
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
            <img onClick={() => author !== loggedOnUser? handleVoteClick(1, 'upVote'): setStatusMessage('You can\'t vote on your own content')} src={vote_plus} alt="Up Vote" />
            <span className={`${voteTracker === 1 || voteTracker === -1 ? "voted" : "not-voted"}`}>{votes >= 0 ? votes : null}</span>
            <img onClick={() => author !== loggedOnUser? handleVoteClick(-1, 'downVote'): setStatusMessage('You can\'t vote on your own content')} src={vote_minus} alt="Down Vote" />
            <span className={`${voteTracker === -1 ? "voted" : "not-voted"}`}>{votes < 0 ? votes : null}</span>
            {statusMessage && <span className='error'> {statusMessage} </span>}
        </div>
    )
}

export default Votes