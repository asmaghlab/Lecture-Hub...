import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../Avatar';
import './AppNavbar.css';

const AppNavbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="app-navbar">
            <div className="navbar-brand">
                <Link to="/">Lecture Hub</Link>
            </div>
            <div className="navbar-menu">
                {isAuthenticated ? (
                    <>
                        <Link to="/upload" className="nav-item">Upload</Link>
                        <Link to="/results" className="nav-item">Results</Link>
                        <div className="user-section">
                            <span className="user-name">{user?.name}</span>
                            <Avatar name={user?.name} />
                            <button onClick={handleLogout} className="logout-btn">Logout</button>
                        </div>
                    </>
                ) : (
                    <Link to="/login" className="nav-item">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default AppNavbar;
