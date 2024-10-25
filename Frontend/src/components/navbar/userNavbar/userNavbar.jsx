import { useNavigate, useLocation } from 'react-router-dom';
import { FiAlignJustify } from "react-icons/fi";
import { useAuth } from '../../../Context/authContext.jsx';
import './UserNavbar.css';
import { useState } from 'react';

export default function UserNavbar() {
  const { signout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='user-navbar-container'>
      <div className='user-menu-container'>
        <div className={`a-user-navbar ${location.pathname === '/user' ? 'active' : ''}`} onClick={() => navigate('/user')}>
          <p>Burial Search</p>
        </div>
        <div className={`a-user-navbar ${location.pathname === '/user/cemeterylot' ? 'active' : ''}`} onClick={() => navigate('/user/cemeterylot')}>
          <p>Cemetery Lot</p>
        </div>
        <div className={`a-user-navbar ${location.pathname === '/user/VirtualTour' ? 'active' : ''}`} onClick={() => navigate('/user/VirtualTour')}>
          <p>Virtual Tour</p>
        </div>

        {/* Desktop-only Signout button */}
        <button className='user-navbar-signoutButton desktop-signout' onClick={signout}>Sign out</button>
      </div>

      {/* Burger icon for mobile menu */}
      <FiAlignJustify className='user-burger' onClick={toggleMenu} />

      {/* Mobile menu */}
      {isOpen && (
        <div className="user-mobile-menu">
          <div className={`a-user-navbar ${location.pathname === '/user' ? 'active' : ''}`} onClick={() => navigate('/user')}>
            <p>Burial Search</p>
          </div>
          <div className={`a-user-navbar ${location.pathname === '/user/cemeterylot' ? 'active' : ''}`} onClick={() => navigate('/user/cemeterylot')}>
            <p>Cemetery Lot</p>
          </div>
          <div className={`a-user-navbar ${location.pathname === '/user/VirtualTour' ? 'active' : ''}`} onClick={() => navigate('/user/VirtualTour')}>
            <p>Virtual Tour</p>
          </div>
          <button className='user-navbar-signoutButton' onClick={signout}>Sign out</button>
        </div>
      )}
    </nav>
  );
}
