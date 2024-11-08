// UserProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../Context/authContext.jsx';
import { useVacantLots } from '../../Context/vancantlotsContext.jsx';

export default function VisitorProtectedRoute() {
  const { isAuthenticated, user } = useAuth();
  const { isLoading } = useVacantLots();

  if (isAuthenticated) {
    return <Navigate to="/auth/signin" replace />;
  }

  if (user?.role === 'admin') {
    // Redirect to admin dashboard or an unauthorized page for admin
    return <Navigate to="/admin" replace />;
  }

  if (user?.role === 'user') {
    // Redirect to user dashboard or an unauthorized page for user
    return <Navigate to="/user" replace />;
  }

  if (isLoading) {
    // Return a loading indicator while vacant lots are being fetched
    return <div>Loading vacant lots...</div>;
  }
  
  return <Outlet />; 
}