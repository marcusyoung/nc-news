import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoggedOnUserContext } from '../contexts/LoggedOnUser'
import { logoutUser } from '../../utils/api'

function UserLogout() {

    const { setLoggedOnUser } = useContext(LoggedOnUserContext)
    const [statusMessage, setStatusMessage] = useState('')
    const navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault()
        logoutUser()
            .then(() => {
                setLoggedOnUser('')
                navigate('/login')
            })
            .catch(error => {
                if (error.response.data.msg) {
                    setStatusMessage(error.response.data.msg)
                } else {
                    setStatusMessage("Oops... there was a problem logging out")
                }
            })
    }

    return (
        <section id="logout">
            <form onSubmit={handleSubmit} id="logout-form">
                <button type="submit" className="submit-button">Logout</button>
            </form>
            {statusMessage && <p className='status'> {statusMessage} </p>}
        </section>
    )
}


export default UserLogout