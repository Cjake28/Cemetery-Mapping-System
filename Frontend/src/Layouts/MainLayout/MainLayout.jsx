import { Outlet } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar.jsx';
import './MainLayout.css'

export default function MainLayout() {
  return (
    <div className="main-layout">
      <Navbar />
      <Outlet />
    </div>
  );
}
