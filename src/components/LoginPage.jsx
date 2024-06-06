import { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { LoggedOnUserContext } from '../contexts/LoggedOnUser'
import { authUser } from '../../utils/api'

function LoginPage() {

    const { loggedOnUser, setLoggedOnUser } = useContext(LoggedOnUserContext)
    const [statusMessage, setStatusMessage] = useState('')
    const [usernameText, setUsernameText] = useState('')
    const [passwordText, setPasswordText] = useState('')
    const navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault()
        const body = { username: usernameText, password: passwordText }
        setStatusMessage("Logging on...")
        authUser(body)
            .then((response) => {
                if (response.status === 200) {
                    setLoggedOnUser(usernameText)
                    setStatusMessage("")
                    navigate(-1)
                }
            })
            .catch(error => {
                setStatusMessage("Oops... there was a problem logging on")
            })
    }

    return (
        <section id="login">
            <form onSubmit={handleSubmit} id="login-form">
                <label id="enter-username-label" htmlFor="enter-username">Username:</label>
                <input type='text' onChange={(e) => setUsernameText(e.target.value)} value={usernameText}></input>
                <label id="enter-password-label" htmlFor="enter-password">Password:</label>
                <input type='text' onChange={(e) => setPasswordText(e.target.value)} value={passwordText}></input>
                <button type="submit" id="login-submit">Login</button>
            </form>
            {statusMessage && <p className='status'> {statusMessage} </p>}
            <p><Link to={`/signup`}>Sign up</Link></p>
        </section>
    )

}


export default LoginPage