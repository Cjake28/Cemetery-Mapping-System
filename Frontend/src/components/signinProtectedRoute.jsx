import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../Context/authContext.jsx';

export default function ProtectedsigninRoute() {
  const { isAuthenticated } = useAuth();

  // If user is logged in, redirect them to the home page
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <Outlet />  {/* This is where child routes like login and signup will be rendered */}
    </div>
  );
}
