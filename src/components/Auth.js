import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthPage = ({ isLogin }) => {
    const [form, setForm] = useState({ username: '', password: '', email: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/user/register';
        try {
            const res = await axios.post(`http://localhost:8080${endpoint}`, form);
            if (isLogin) {
                localStorage.setItem('user', JSON.stringify(res.data)); // Stores JWT
                navigate('/dashboard');
            } else {
                alert("Account created! Please login.");
                navigate('/login');
            }
        } catch (err) { alert("Authentication failed. Check your credentials."); }
    };

    return (
        <div className="container mt-5 pt-5">
            <div className="row justify-content-center">
                <div className="col-md-4 card p-4 shadow bg-dark text-white border-secondary">
                    <h2 className="text-center mb-4">{isLogin ? 'Welcome Back' : 'Join BeyondShorts'}</h2>
                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <input className="form-control mb-3 bg-secondary text-white border-0" placeholder="Username"
                                onChange={e => setForm({ ...form, name: e.target.value })} />

                        )}
                        <input className="form-control mb-3 bg-secondary text-white border-0" placeholder="Email"
                            onChange={e => setForm({ ...form, email: e.target.value })} />
                        <input className="form-control mb-3 bg-secondary text-white border-0" type="password" placeholder="Password"
                            onChange={e => setForm({ ...form, password: e.target.value })} />
                        <button className="btn btn-info w-100 fw-bold">{isLogin ? 'Login' : 'Register'}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};