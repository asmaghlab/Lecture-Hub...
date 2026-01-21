import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import toast from 'react-hot-toast';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Please fill in all fields');
            return;
        }

        const loadingToast = toast.loading('Signing in...');

        try {
            const result = await login(email, password);
            toast.dismiss(loadingToast);

            if (result.success) {
                toast.success(`Welcome back, ${result.user.name}!`);
                navigate('/upload');
            } else {
                toast.error(result.message || 'Login failed');
            }
        } catch (err) {
            toast.dismiss(loadingToast);
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <div className="icon-circle">
                        <FaUser className="user-icon" />
                    </div>
                    <h2>Login</h2>
                    <p className="subtitle">Please sign in to continue</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">EMAIL</label>
                        <div className="input-wrapper">
                            <span className="input-icon"><FaEnvelope /></span>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">PASSWORD</label>
                        <div className="input-wrapper">
                            <span className="input-icon"><FaLock /></span>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>
                    <button type="submit" className="login-btn">LOGIN</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
