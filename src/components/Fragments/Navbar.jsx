import { Link } from "react-router-dom"

export const Navbar = ({user, handleLogout}) => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
            <div className="container">
                <Link className="navbar-brand" to="/">Facegram</Link>
                <div className="navbar-nav">
                    {user && <Link className="nav-link" to={`/profile/${user.username}`}>@{user.username}</Link>}
                    <p className="nav-link" onClick={handleLogout}>Logout</p>
                </div>
            </div>
        </nav>
    )
}