import { useContext, useEffect, useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { LoggedOnUserContext } from '../contexts/LoggedOnUser'
import { authUser } from '../../utils/api'

function UserLogin() {

    const { loggedOnUser, setLoggedOnUser } = useContext(LoggedOnUserContext)
    const [statusMessage, setStatusMessage] = useState('')
    const [usernameText, setUsernameText] = useState('')
    const [passwordText, setPasswordText] = useState('')
    const navigate = useNavigate()
    const location = useLocation()


    function handleSubmit(event) {
        event.preventDefault()
        const body = { username: usernameText, password: passwordText }
        setStatusMessage("Logging on...")
        authUser(body)
            .then((response) => {
                if (response.status === 200) {
                    setLoggedOnUser(usernameText)
                    setUsernameText('')
                    setPasswordText('')
                    setStatusMessage('')
                    if (location.state && location.state.previousLocationPathname === "/signup") {
                        navigate('/')
                    } else {
                        navigate(-1)
                    }
                }
            })
            .catch(error => {
                if (error.response.data.msg) {
                    setStatusMessage(error.response.data.msg)
                } else {
                    setStatusMessage("Oops... there was a problem logging on")
                }
            })
    }

    return (
        <>
            <h1>Login</h1>
            <section id="login">
                <form onSubmit={handleSubmit} id="login-form">
                    <label id="enter-username-label" htmlFor="enter-username">Username:</label>
                    <input type='text' onChange={(e) => setUsernameText(e.target.value)} value={usernameText}></input>
                    <label id="enter-password-label" htmlFor="enter-password">Password:</label>
                    <input type='password' onChange={(e) => setPasswordText(e.target.value)} value={passwordText}></input>
                    <button disabled={usernameText.length === 0 || passwordText.length === 0} type="submit" className="submit-button">Login</button>
                </form>
                {statusMessage && <p className='status'> {statusMessage} </p>}
                <p>If you don't yet have an account, <Link to={`/signup`}>Sign up</Link></p>
            </section>
        </>
    )

}


export default UserLogin