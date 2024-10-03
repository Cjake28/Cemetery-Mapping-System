import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../Context/authContext.jsx';

export default function AdminProtectedRoute() {
    const { isAuthenticated, user } = useAuth();
  
    if (!isAuthenticated) {
      return <Navigate to="/auth/signin" replace />;
    }
  
    if (user?.role !== 'admin') {
      return <Navigate to="/user" replace />;
    }
  
    return <Outlet />;
  }