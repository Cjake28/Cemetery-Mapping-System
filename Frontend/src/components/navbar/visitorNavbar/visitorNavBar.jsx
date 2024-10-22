import { useNavigate, useLocation } from 'react-router-dom';
import { FiAlignJustify } from "react-icons/fi";
import { useState } from 'react';
import './visitorNavbar.css';

export default function VisitorNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigateToLogin = () => {
    navigate('/auth/signin');
  };

  return (
    <nav className='visitor-navbar-container'>
      <div className='visitor-menu-container'>
        <div className={`a-visitor-navbar ${location.pathname === '/visitor' ? 'active' : ''}`} onClick={() => navigate('/visitor')}>
          <p>Virtual Tour</p>
        </div>
        <div className={`a-visitor-navbar ${location.pathname === '/visitor/vacant-lot' ? 'active' : ''}`} onClick={() => navigate('/visitor/vacant-lot')}>
          <p>Vacant Lot</p>
        </div>

        {/* Desktop-only Login button */}
        <button className='visitor-navbar-loginButton desktop-login' onClick={handleNavigateToLogin}>Login</button>
      </div>

      {/* Burger icon for mobile menu */}
      <FiAlignJustify className='visitor-burger' onClick={toggleMenu} />

      {/* Mobile menu */}
      {isOpen && (
        <div className="visitor-mobile-menu">
          <div className={`a-visitor-navbar ${location.pathname === '/visitor' ? 'active' : ''}`} onClick={() => (navigate('/visitor'), setIsOpen(false))}>
            <p>Virtual Tour</p>
          </div>
          <div className={`a-visitor-navbar ${location.pathname === '/visitor/vacant-lot' ? 'active' : ''}`} onClick={() => ( navigate('/visitor/vacant-lot'), setIsOpen(false))}>
            <p>Vacant Lot</p>
          </div>
          <button className='visitor-navbar-loginButton' onClick={handleNavigateToLogin}>Login</button>
        </div>
      )}
    </nav>
  );
}
