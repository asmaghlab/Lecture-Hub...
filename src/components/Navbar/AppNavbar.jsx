import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaSignOutAlt, FaCloudUploadAlt, FaList } from 'react-icons/fa';
import Avatar from '../Avatar';
import Swal from 'sweetalert2';
import './AppNavbar.css';

const AppNavbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out of your session.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!'
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
                navigate('/login');
                Swal.fire(
                    'Logged Out!',
                    'You have been successfully logged out.',
                    'success'
                );
            }
        });
    };

    const isActive = (path) => location.pathname === path;

    const displayName = user?.name || user?.email?.split('@')[0] || 'User';

    return (
        <nav className="app-navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <Link to="/">LectureHub</Link>
                </div>

                <div className="navbar-menu">
                    {isAuthenticated ? (
                        <>
                            <div className="nav-links">
                                <Link
                                    to="/upload"
                                    className={`nav-item ${isActive('/upload') ? 'active' : ''}`}
                                >
                                    <FaCloudUploadAlt className="nav-icon" /> Upload
                                </Link>
                                <Link
                                    to="/results"
                                    className={`nav-item ${isActive('/results') ? 'active' : ''}`}
                                >
                                    <FaList className="nav-icon" /> Results
                                </Link>
                            </div>

                            <div className="user-section">
                                <div className="user-profile-group">
                                    <Avatar name={displayName} />
                                    <div className="user-info">
                                        <span className="welcome-text">Welcome,</span>
                                        <span className="user-name">{displayName}</span>
                                    </div>
                                </div>
                                <button onClick={handleLogout} className="logout-btn" title="Logout">
                                    <FaSignOutAlt />
                                </button>
                            </div>
                        </>
                    ) : (
                        <Link to="/login" className="nav-item">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default AppNavbar;
