import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { LoggedOnUserContext } from '../contexts/LoggedOnUser'

function Header() {

    const {loggedOnUser} = useContext(LoggedOnUserContext)

    return (
        <nav aria-label="Main">
            <ul>
                <li><Link to="/">Northcoders News</Link></li>
                <li><Link to="/articles">All articles</Link></li>
                <li><Link to="/topics">Topics</Link></li>
                <li>{loggedOnUser ? <Link to="/profile">{loggedOnUser}</Link>: <Link to="/login">Login</Link>}</li>
            </ul>
        </nav>
    )
}

export default Header