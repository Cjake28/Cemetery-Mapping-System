// UserProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../Context/authContext.jsx';

export default function UserProtectedRoute() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" replace />;
  }

  if (user?.role !== 'user') {
    // Redirect to admin dashboard or an unauthorized page for admin
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />; 
}
