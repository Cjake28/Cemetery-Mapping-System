import { useNavigate, useLocation } from 'react-router-dom';
import { FiAlignJustify } from "react-icons/fi";
import { useAuth } from '../../../Context/authContext.jsx';
import './adminNavbar.css';
import { useState } from 'react';

export default function AdminNavbar() {
  const { signout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='admin-navbar-container'>
      <div className='admin-menu-container'>
        {/* Menu items for desktop and mobile */}
        <div className={`a-admin-navbar ${location.pathname === '/admin' ? 'active' : ''}`} onClick={() => navigate('/admin')}>
          <p>user</p>
        </div>
        <div className={`a-admin-navbar ${location.pathname === '/admin/manage-vacant-lot' ? 'active' : ''}`} onClick={() => navigate('/admin/manage-vacant-lot')}>
          <p>Cemetery Lot</p>
        </div>
        <div className={`a-admin-navbar ${location.pathname === '/admin/manage-gravesite' ? 'active' : ''}`} onClick={() => navigate('/admin/manage-gravesite')}>
          <p>Gravesite</p>
        </div>
        
        {/* Desktop-only Signout button */}
        <button className='admin-navbar-signoutButton desktop-signout' onClick={signout}>Sign out</button>
      </div>

      {/* Burger icon for mobile menu */}
      <FiAlignJustify className='admin-burger' onClick={toggleMenu}/>

      {/* Mobile menu */}
      {isOpen && (
        <div className="admin-mobile-menu">
          <div className={`a-admin-navbar ${location.pathname === '/admin' ? 'active' : ''}`} onClick={() => navigate('/admin')}>
            <p>user</p>
          </div>
          <div className={`a-admin-navbar ${location.pathname === '/admin/manage-vacant-lot' ? 'active' : ''}`} onClick={() => navigate('/admin/manage-vacant-lot')}>
            <p>Cemetery Lot</p>
          </div>
          <div className={`a-admin-navbar ${location.pathname === '/admin/manage-gravesite' ? 'active' : ''}`} onClick={() => navigate('/admin/manage-gravesite')}>
            <p>Gravesite</p>
          </div>
          <button className='admin-navbar-signoutButton' onClick={signout}>Sign out</button>
        </div>
      )}
    </nav>
  );
}
