import { Outlet, Navigate } from 'react-router-dom';
import Usernavbar from '../../components/navbar/userNavbar/userNavbar.jsx';
import AdminNavbar from '../../components/navbar/adminNavbar/adminNavbar.jsx';
import { useAuth } from '../../Context/authContext.jsx';
import './MainLayout.css';

export default function MainLayout() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" replace />;
  }
  
  // Instead of redirecting here, consider rendering different layouts based on role
  return (
    <div className="main-layout">
      {user?.role === 'user' ? <Usernavbar /> : <AdminNavbar/>}
      <Outlet/>
    </div>
  );
}
