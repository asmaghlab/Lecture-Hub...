import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import AppNavbar from '../components/Navbar/AppNavbar';
import Login from '../pages/Login/Login';
import Upload from '../pages/Upload/Upload';
import Results from '../pages/Results/Results';

const AppRoutes = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';

    return (
        <>
            {!isLoginPage && <AppNavbar />}
            <Routes>
                <Route path="/login" element={<Login />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/upload" element={<Upload />} />
                    <Route path="/results" element={<Results />} />
                    {/* Default redirect to upload if logged in, or handle 404 */}
                    <Route path="/" element={<Navigate to="/upload" replace />} />
                </Route>

                {/* Catch all */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </>
    );
};

export default AppRoutes;
