import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoggedOnUserContext } from '../contexts/LoggedOnUser'

function UserLogout() {

    const { setLoggedOnUser } = useContext(LoggedOnUserContext)
    const navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault
        localStorage.removeItem('jwt-token')
        setLoggedOnUser('')
        navigate('/login')
    }

    return (
        <section id="logout">
            <form onSubmit={handleSubmit} id="logout-form">
                <button type="submit" class="submit-button">Logout</button>
            </form>
        </section>
    )
}


export default UserLogout