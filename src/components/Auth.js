import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import ToastMessage from "./ToastMessage";
import Loader from './Loader';

export const AuthPage = ({ isLogin }) => {
    const [form, setForm] = useState({ name: '', password: '', email: '' });
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    const toastMessage = location.state?.toastMessage;
    const toastType = location.state?.toastType || "danger";

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? "/api/auth/login" : "/api/auth/user/register";

        try {
            setLoading(true);

            const res = await axios.post(`${endpoint}`, form);

            if (isLogin) {
                localStorage.setItem("user", JSON.stringify(res.data));
                navigate("/dashboard", {
                    state: { toastMessage: "🎉 Login successful!", toastType: "success" }
                });
            } else {
                navigate("/login", {
                    state: { toastMessage: "✅ Account created! Please login.", toastType: "info" }
                });
            }
        } catch (err) {
            navigate("/login", {
                state: { toastMessage: "❌ Authentication failed. Try again!", toastType: "danger" }
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="container mt-5 pt-5">

            {/* Toast */}
            <ToastMessage message={toastMessage} type={toastType} />

            <div className="row justify-content-center">
                <div className="col-md-4 card p-4 shadow bg-dark text-white border-secondary">
                    <h2 className="text-center mb-4">
                        {isLogin ? 'Welcome Back' : 'Join BeyondShorts'}
                    </h2>

                    {loading ? (
                        <Loader text={isLogin ? "Logging you in..." : "Creating account..."} />
                    ) : (
                        <form onSubmit={handleSubmit}>
                            {!isLogin && (
                                <input
                                    className="form-control mb-3 text-white border-0"
                                    placeholder="Username"
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                />
                            )}

                            <input
                                className="form-control mb-3 text-white border-0"
                                placeholder="Email"
                                onChange={e => setForm({ ...form, email: e.target.value })}
                            />

                            <input
                                className="form-control mb-3 text-white border-0"
                                type="password"
                                placeholder="Password"
                                onChange={e => setForm({ ...form, password: e.target.value })}
                            />

                            <button className="btn btn-info w-100 fw-bold">
                                {isLogin ? 'Login' : 'Register'}
                            </button>
                            <div className="text-center mt-3">
                                <Link to="/forgot-password" size="sm" className="text-info text-decoration-none small">Forgot Password?</Link>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};
