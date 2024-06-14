
import { useContext, useEffect } from 'react'
import { LoggedOnUserContext } from '../contexts/LoggedOnUser'
import { useNavigate } from 'react-router-dom'

import UserLogout from "./UserLogout"

function UserProfile() {

    const { loggedOnUser } = useContext(LoggedOnUserContext)
    const navigate = useNavigate()

    if (loggedOnUser) {
        return (
            <>
                <h1>User Profile</h1>
                <section id="profile"></section>
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