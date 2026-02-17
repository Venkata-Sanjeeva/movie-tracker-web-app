import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const logout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm mb-4">
            <div className="container">
                <Link className="navbar-brand fw-bold text-info" to="/">BEYOND SHORTS</Link>
                <div className="navbar-nav ms-auto">
                    {user ? (
                        <>
                            <Link className="nav-link" to="/dashboard">My Library</Link>
                            <Link className="nav-link" to="/add">Add Movie</Link>
                            <button onClick={logout} className="btn btn-outline-light btn-sm ms-3">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link className="nav-link" to="/login">Login</Link>
                            <Link className="nav-link btn btn-info text-light btn-sm ms-2" to="/register">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;