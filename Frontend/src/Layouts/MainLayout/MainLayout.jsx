import { Outlet, Navigate } from 'react-router-dom';
import Usernavbar from '../../components/navbar/userNavbar/userNavbar.jsx';
import AdminNavbar from '../../components/navbar/adminNavbar/adminNavbar.jsx';
import VisitorNabvar from '../../components/navbar/visitorNavbar/visitorNavBar.jsx';
import { useAuth } from '../../Context/authContext.jsx';
import './MainLayout.css';

export default function MainLayout() {
  const { isAuthenticated, user } = useAuth();

  // Logic to determine the correct navbar based on user role
  let NavbarComponent;

  if (user?.role === 'user') {
    NavbarComponent = Usernavbar;
  } else if (user?.role === 'admin') {
    NavbarComponent = AdminNavbar;
  } else {
    // If no role, or if the role is neither 'admin' nor 'user', show VisitorNavbar
    NavbarComponent = VisitorNabvar;
  }

  return (
    <div className="main-layout">
      <NavbarComponent />
      <Outlet />
    </div>
  );
}
