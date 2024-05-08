import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { LoggedOnUserContext } from '../contexts/LoggedOnUser'

function Header() {

    const {loggedOnUser} = useContext(LoggedOnUserContext)

    return (
        <nav>
            <ul>
                <Link to="/"><li>Northcoders News</li></Link>
                <Link to="/"><li>All articles</li></Link>
                <li>Topics</li>
                <li>{loggedOnUser}</li>
            </ul>
        </nav>
    )
}

export default Header