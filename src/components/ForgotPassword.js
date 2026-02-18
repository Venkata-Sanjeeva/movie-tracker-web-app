import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ToastMessage from "./ToastMessage";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Using URLSearchParams because Spring expects @RequestParam
            const params = new URLSearchParams();
            params.append('email', email);

            const res = await axios.post(`${API_BASE_URL}/email/forgot-password`, params);
            setMessage({ text: res.data, type: 'success' });
        } catch (err) {
            setMessage({ text: "Failed to send reset link.", type: 'danger' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5 pt-5">
            <ToastMessage message={message.text} type={message.type} />
            <div className="row justify-content-center">
                <div className="col-md-4 card p-4 shadow bg-dark text-white border-secondary">
                    <h3 className="text-center mb-4">Reset Password</h3>
                    <p className="small text-muted text-center">Enter your email and we'll send you a link to get back into your account.</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            className="form-control mb-3 bg-dark text-white border-secondary"
                            placeholder="Enter your email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button className="btn btn-info w-100 fw-bold" disabled={loading}>
                            {loading ? "Sending..." : "Send Reset Link"}
                        </button>
                    </form>
                    <div className="text-center mt-3">
                        <Link to="/login" className="text-info text-decoration-none small">Back to Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;