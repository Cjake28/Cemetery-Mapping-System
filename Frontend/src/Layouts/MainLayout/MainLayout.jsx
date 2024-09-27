import { Outlet } from 'react-router-dom';
import Usernavbar from '../../components/navbar/userNavbar/userNavbar.jsx';
import './MainLayout.css'

export default function MainLayout() {
  return (
    <div className="main-layout">
      <Usernavbar />
      <Outlet />
    </div>
  );
}
