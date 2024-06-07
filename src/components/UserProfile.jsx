import { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { LoggedOnUserContext } from '../contexts/LoggedOnUser'

function UserProfile() {

    const { loggedOnUser } = useContext(LoggedOnUserContext)

    return
}


export default UserProfile