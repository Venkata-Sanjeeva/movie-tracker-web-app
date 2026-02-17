import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const userObj = localStorage.getItem('user');
        if (userObj) {
            setUser(JSON.parse(userObj));
        }
    }, []);

    return (
        <div className="container text-center mt-5">
            <div className="py-5">
                <h1 className="display-3 fw-bold text-white">Stop wondering if you've <span className="text-info">actually</span> seen it.</h1>
                <p className="lead text-secondary mt-3">
                    Turn your YouTube Shorts rabbit holes into a organized movie library.
                    Track what you find, what you download, and what you've finally finished.
                </p>
                {user ? <Link to="/dashboard" className="btn btn-info btn-lg px-5 me-3 fw-bold">Go to Library</Link> :(
                    <div className="mt-5">
                        <Link to="/register" className="btn btn-info btn-lg px-5 me-3 fw-bold">Get Started</Link>
                        <Link to="/login" className="btn btn-outline-light btn-lg px-5">Login</Link>
                    </div>
                )}
            </div>

            <div className="row mt-5 text-secondary">
                <div className="col-md-4">
                    <h3>1. Find</h3>
                    <p>Saw a cool clip on Shorts? Search the name and save it here instantly.</p>
                </div>
                <div className="col-md-4">
                    <h3>2. Status</h3>
                    <p>Track if it's currently sitting in your downloads folder or still on your wishlist.</p>
                </div>
                <div className="col-md-4">
                    <h3>3. Verify</h3>
                    <p>Mark as "Watched" with a date stamp so you never watch the same intro twice.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;