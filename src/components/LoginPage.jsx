import { useContext, useState } from 'react'
import { LoggedOnUserContext } from '../contexts/LoggedOnUser'

function LoginPage() {

    const [statusMessage, setStatusMessage] = useState('')
    const [usernameText, setUsernameText] = useState('')
    const [passwordText, setPasswordText] = useState('')

    function handleSubmit(event) {
        event.preventDefault()
    }

    return (
        <section id="login">
            <form onSubmit={handleSubmit} id="login-form">
                <label id="enter-username-label" htmlFor="enter-username">Username:</label>
                <input type='text'onChange={(e) => setUsernameText(e.target.value)} value={usernameText}></input>
                <label id="enter-password-label" htmlFor="enter-password">Password:</label>
                <input type='text' onChange={(e) => setPasswordText(e.target.value)} value={passwordText}></input>
                <button type="submit" id="login-submit">Login</button>
            </form>
            {statusMessage && <p className='status'> {statusMessage} </p>}
        </section>
    )

}


export default LoginPage