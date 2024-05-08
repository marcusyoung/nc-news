import vote_plus from '../../assets/heart-plus.png'
import vote_minus from '../../assets/heart-minus.png'
import { useContext, useState } from 'react'
import { LoggedOnUserContext } from '../contexts/LoggedOnUser'
import { voteForArticle } from '../../utils/api'

function Votes({ itemVotes, article_id, comment_id }) {

    const { loggedOnUser } = useContext(LoggedOnUserContext)
    const [votes, setVotes] = useState(itemVotes)
    const [errorMessage, setErrorMessage] = useState('')

    const handleVoteClick = (num) => {
        setErrorMessage('')
        if (loggedOnUser) {
            if (article_id) {
                // optimistically update vote count
                setVotes((current) => current + num)
                voteForArticle(article_id, { inc_votes: num })
                    .catch(error => {
                        // undo vote if vote increment failed on backend
                        setVotes((current) => current - num)
                        setErrorMessage("Oops... there was a problem voting")
                    })
            }
        } else {
            setErrorMessage("Sorry... you must be logged on to vote")
        }
    }

    return (
        <div className="votes">
            <img onClick={() => handleVoteClick(1)} src={vote_plus} alt="Vote" />
            {votes >= 0 ? votes : null}
            <img onClick={() => handleVoteClick(-1)} src={vote_minus} alt="Vote" />
            {votes < 0 ? votes : null}
            {errorMessage && <span className='error'> {errorMessage} </span>}
        </div>
    )
}

export default Votes