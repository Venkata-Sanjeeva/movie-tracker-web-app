import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ToastMessage from "./ToastMessage";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token"); // Extracts 'token' from ?token=xyz

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage({ text: "Passwords do not match!", type: "danger" });
            return;
        }

        try {
            // Matches your ResetPasswordRequest DTO in Spring Boot
            const res = await axios.post(`${API_BASE_URL}/email/reset-password`, {
                token: token,
                newPassword: newPassword
            });
            console.log(res.data);
            
            // Redirect to login on success
            navigate("/login", { state: { toastMessage: "Password updated! Please login.", toastType: "success" } });
        } catch (err) {
            setMessage({ text: err.response?.data || "Error resetting password", type: "danger" });
        }
    };

    return (
        <div className="container mt-5 pt-5">
            <ToastMessage message={message.text} type={message.type} />
            <div className="row justify-content-center">
                <div className="col-md-4 card p-4 shadow bg-dark text-white border-secondary">
                    <h3 className="text-center mb-4">New Password</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="password"
                            className="form-control mb-3 bg-dark text-white border-secondary"
                            placeholder="New Password"
                            required
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            className="form-control mb-3 bg-dark text-white border-secondary"
                            placeholder="Confirm New Password"
                            required
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button className="btn btn-info w-100 fw-bold">Update Password</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;