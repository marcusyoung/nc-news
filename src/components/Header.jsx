import { Link } from 'react-router-dom';

function Header() {
    return (
        <nav>
            <ul>
                <Link to="/"><li>Northcoders News</li></Link>
                <Link to="/"><li>All articles</li></Link>
                <li>Topics</li>
                <li>Avatar</li>
            </ul>
        </nav>
    )
}

export default Header