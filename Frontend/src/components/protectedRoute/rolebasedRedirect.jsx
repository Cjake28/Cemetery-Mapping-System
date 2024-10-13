import { useAuth } from '../../Context/authContext.jsx';
import { Navigate } from 'react-router-dom';

export default function RoleBasedRedirect() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    // If not authenticated, redirect to sign-in
    return <Navigate to="/auth/signin" replace />;
  }

  // Redirect based on user role
  if (user?.role === 'user') {
    return <Navigate to="/user" replace />;
  }

  if (user?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }
  
  // Default fallback (though should never hit this if roles are set properly)
  return <Navigate to="/auth/signin" replace />;
}
