import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (role && user.role !== role) {
        // Redirect to unauthorized or back to home if user doesn't have the role
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
