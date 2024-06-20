import { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createUser } from '../../utils/api'

function UserSignup() {
    const [statusMessage, setStatusMessage] = useState('')
    const [usernameText, setUsernameText] = useState('')
    const [passwordText, setPasswordText] = useState('')
    const [nameText, setNameText] = useState('')
    const [avatarUrlText, setAvatarUrlText] = useState('')
    const navigate = useNavigate()
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,16}$/
    const usernameRegex = /^[A-Za-z0-9]{5,}$/

    function handleSubmit(event) {
        event.preventDefault()
        const body = { username: usernameText, password: passwordText, name: nameText, avatar_url: avatarUrlText }
        setStatusMessage('Signing up...')
        createUser(body)
            .then((response) => {
                if (response.status === 201) {
                    setStatusMessage('')
                    navigate("/login", { state: { previousLocationPathname: location.pathname } })
                }
            })
            .catch(error => {
                if (error.response.data.msg) {
                    switch (error.response.data.msg) {
                        case 'Invalid input (unique_violation)':
                            setStatusMessage("Sorry... that username is already taken")
                            break
                        default: setStatusMessage(error.response.data.msg)
                    }
                } else {
                    setStatusMessage("Oops... there was a problem creating an account")
                }
            })
    }

    return (
        <>
            <h1>Sign up</h1>
            <section id="signup">
                <form onSubmit={handleSubmit} id="signup-form">
                    <label id="enter-username-label" htmlFor="enter-username">Username:</label>
                    <input type='text' onChange={(e) => setUsernameText(e.target.value)} value={usernameText}></input>
                    {!usernameRegex.test(usernameText) && <div className='error'>Must have at least 5 alphanumeric characters and no spaces</div>}
                    <label id="enter-password-label" htmlFor="enter-password">Password:</label>
                    <input type='password' onChange={(e) => setPasswordText(e.target.value)} value={passwordText}></input>
                    {!passwordRegex.test(passwordText) && <div className='error'>Must have 8-16 characters and contain a number</div>}
                    <label id="enter-name-label" htmlFor="enter-name">Name:</label>
                    <input type='text' onChange={(e) => setNameText(e.target.value)} value={nameText}></input>
                    <label id="enter-avatarurl-label" htmlFor="enter-avatarurl">Avatar URL:</label>
                    <input type='text' onChange={(e) => setAvatarUrlText(e.target.value)} value={avatarUrlText}></input>
                    <button disabled={!passwordRegex.test(passwordText) || !usernameRegex.test(usernameText)} type="submit" class="submit-button">Sign up!</button>
                </form>
                {statusMessage && <p className='status'> {statusMessage} </p>}
                <p>If you already have an account, <Link to={`/login`}>Login</Link></p>
            </section>
        </>
    )

}


export default UserSignup