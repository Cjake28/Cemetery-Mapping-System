import { Link, useLocation } from 'react-router-dom';
import './userNavbar.css';
import { useAuth } from '../../../Context/authContext.jsx';

export default function Usernavbar() {
  const { signout } = useAuth();
  const location = useLocation();

  return (
    <nav className='user-navbar-container'>
      <ul className='ul-user-navbar'>
        <li className='li-user-navbar'>
          <Link
            to="/user"
            className={`a-user-navbar ${location.pathname === '/user' ? 'active' : ''}`}
          >
            Burial Search
          </Link>
        </li>
        <li className='li-user-navbar'>
          <Link
            to="/user/cementerylot"
            className={`a-user-navbar ${location.pathname === '/user/cementerylot' ? 'active' : ''}`}
          >
            Cemetery Lot
          </Link>
        </li>
        <li className='li-user-navbar'>
          <Link
            to="/user/VirtualTour"
            className={`a-user-navbar ${location.pathname === '/user/VirtualTour' ? 'active' : ''}`}
          >
            Virtual Tour
          </Link>
        </li>
      </ul>
      <button className='user-navbar-signoutButton' onClick={signout}>
        Sign out
      </button>
    </nav>
  );
}
