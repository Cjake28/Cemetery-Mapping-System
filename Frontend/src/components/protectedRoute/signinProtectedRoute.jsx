import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../Context/authContext.jsx';

export default function ProtectedsigninRoute() {
  const { isAuthenticated, user } = useAuth();

  // If user is logged in, redirect them to the home page
  if (user?.role === 'admin' && isAuthenticated) {
    return <Navigate to="/admin" replace />;  // Absolute path
  }
  
  if (user?.role === 'user' && isAuthenticated) {
    return <Navigate to="/user" replace />;  // Absolute path
  }

  return (
      <Outlet /> 
  );
}


