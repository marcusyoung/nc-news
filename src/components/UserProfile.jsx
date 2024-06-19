
import { useContext, useEffect, useState } from 'react'
import { LoggedOnUserContext } from '../contexts/LoggedOnUser'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../../utils/api'

import UserLogout from "./UserLogout"

function UserProfile() {

    const { loggedOnUser, setLoggedOnUser } = useContext(LoggedOnUserContext)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [userProfile, setUserProfile] = useState({})
    const [statusMessage, setStatusMessage] = useState('')

    if (loggedOnUser) {
        useEffect(() => {
            setLoading(true)
            getUser(loggedOnUser)
                .then((user) => {
                    setLoading(false)
                    setUserProfile(user)
                })
                .catch(error => {
                if (error.response.status && error.response.status === 403) {
                    setLoggedOnUser('')
                    navigate('/login')
                } else {
                    setStatusMessage("Oops... there was a problem loading your profile")
                }
                })
        }, [])

        if (loading) {
            return <p>Please wait...</p>
        }

        return (
            <>
                <h1>Profile</h1>
                <section id="profile">
                    <img src={userProfile.avatar_url}></img>
                    <ul id="user-profile">
                        <li>Name: {userProfile.name ? userProfile.name : userProfile.username}</li>
                        {userProfile.name ? <li>Username: {userProfile.username}</li> : <></>}
                    </ul>
                    {statusMessage && <p className='status'> {statusMessage} </p>}
                </section>
                <UserLogout />
            </>
        )
    } else {
        useEffect(() => {
            navigate('/login')
        }, [])
    }
}


export default UserProfile