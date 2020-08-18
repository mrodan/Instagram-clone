import React, { useContext } from 'react';
import { Link } from 'react-router-dom'     // LINK for not to refresh website (Link to= <=> a)
import { AuthContext } from '../../Context/AuthContext';
import './NavbarStyle.css'
import SearchBar from './Searchbar/Searchbar'
import NavbarLogin from './LoginRegister/NavbarLogin'
import NavbarRegister from './LoginRegister/NavbarRegister'

const Navbar = (props) => {
    const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(AuthContext);

    const authenticatedActions = () => {
        return (
            <div>
                <div className="">
                    <Link className="" to="/">
                        <img className="action-icon" src="https://i.ibb.co/djrWs6V/Home-White-V2.png" alt="" />
                    </Link>

                    <Link className="" to="/">
                        <img className="action-icon" src="https://i.ibb.co/MN73q9n/Paper-Airplane-V4.jpg" alt="" />
                    </Link>
                    <Link className="" to="/explore">
                        {window.location.pathname !== "/explore" ?
                            <img className="action-icon" src="https://i.ibb.co/z5HHK7w/Compass-White-V2.png" alt="" /> :
                            <img className="action-icon" src="https://i.ibb.co/k24xftQ/Compass-Black-Icon.png" alt="" />
                        }
                    </Link>

                    <Link className="" to="/">
                        <img className="action-icon" src="https://i.ibb.co/rv2c7SD/Heart-White-V2.png" alt="" />
                    </Link>

                    <Link className="" to="/">
                        <img className="action-icon" src="https://i.ibb.co/FKvjjPq/Temp-Pic-Icon.png" alt="" />
                    </Link>
                </div>
            </div>
        )
    }

    const unAuthenticatedActions = () => {
        return (
            <div>
                <Link to="/auth/login">
                    <NavbarLogin />
                </Link>
                <Link to="/auth/register">
                    <NavbarRegister />
                </Link>
            </div>
        )
    }

    return (
        <div className="navbar">
            <a className="logo-section" href="/">
                <img className="img-logo" src="https://i.ibb.co/X85T23s/logo-home.png" alt="" />
            </a>
            <div className="searchbar-section">
                <SearchBar />
            </div>
            <div className="actions-section">
                {isAuthenticated ? authenticatedActions() : unAuthenticatedActions()}
            </div>
        </div>
    );
}

export default Navbar;