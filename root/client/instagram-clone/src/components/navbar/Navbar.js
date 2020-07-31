import React, { useContext } from 'react';
import { Link } from 'react-router-dom'     // LINK for not to refresh website (Link to= <=> a)
import { AuthContext } from '../../Context/AuthContext';
import './NavbarStyle.css'
import SearchBar from './Searchbar/Searchbar'
import NavbarLogin from './LoginRegister/NavbarLogin'
import NavbarRegister from './LoginRegister/NavbarRegister'

const Navbar = () => {
    const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(AuthContext);

    const authenticatedActions = () => {
        return (
            <div>
                AuthActions
            </div>
        )
    }

    const unAuthenticatedActions = () => {
        return (
            <div>
                <a href="/auth/login">
                    <NavbarLogin />
                </a>
                <a href="/auth/register">
                    <NavbarRegister />
                </a>
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