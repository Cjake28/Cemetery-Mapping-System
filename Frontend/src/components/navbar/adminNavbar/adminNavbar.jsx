import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import './adminNavbar.css';
import { useAuth } from '../../../Context/authContext.jsx';

export default function AdminNavbar() {
  const { signout } = useAuth();
  const location = useLocation(); 

  return (
    <nav className='user-navbar-container'>
      <ul className='ul-user-navbar'>
        <li className='li-user-navbar'>
          <Link 
            to="admin" 
            className={`a-user-navbar ${location.pathname === '/admin' ? 'active' : ''}`}
          >
            Users
          </Link>
        </li>
        <li className='li-user-navbar'>
          <Link 
            to="admin/manage-gravesite" 
            className={`a-user-navbar ${location.pathname === '/admin/manage-gravesite' ? 'active' : ''}`}
          >
            Manage Gravesite
          </Link>
        </li>
        {/* <li className='li-user-navbar'>
          <Link to="user/VirtualTour" className={`a-user-navbar ${location.pathname === '/VirtualTour' ? 'active' : ''}`}>
            Virtual Tour
          </Link>
        </li> */}
      </ul>
      <button className='user-navbar-signoutButton' onClick={()=> signout()}>Sign out</button>
    </nav>
  );
}
