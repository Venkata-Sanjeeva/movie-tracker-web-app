import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    // 1. Create a state to track if the menu is open
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    // 2. Function to toggle the state
    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    // 3. Function to close the menu when a link is clicked
    const closeNav = () => setIsNavCollapsed(true);

    const logout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm mb-4 sticky-top">
            <div className="container">
                <Link className="navbar-brand fw-bold text-info" to="/" onClick={closeNav}>
                    BEYOND SHORTS
                </Link>

                <button 
                    className={`navbar-toggler ${isNavCollapsed ? 'collapsed' : ''}`} 
                    type="button" 
                    onClick={handleNavCollapse}
                    aria-expanded={!isNavCollapsed}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse ${!isNavCollapsed ? 'show' : ''}`} id="navbarContent">
                    <div className="navbar-nav ms-auto align-items-lg-center">
                        {user ? (
                            <>
                                <Link className="nav-link" to="/dashboard" onClick={closeNav}>My Library</Link>
                                <Link className="nav-link" to="/add" onClick={closeNav}>Add Movie</Link>
                                <button onClick={logout} className="btn btn-outline-light btn-sm ms-lg-3 mt-2 mt-lg-0">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link className="nav-link" to="/login" onClick={closeNav}>Login</Link>
                                <Link className="nav-link btn btn-info text-light btn-sm ms-lg-2 mt-2 mt-lg-0" to="/register" onClick={closeNav}>Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;