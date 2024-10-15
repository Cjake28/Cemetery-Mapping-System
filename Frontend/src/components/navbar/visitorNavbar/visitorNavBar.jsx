import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function VisitorNabvar() {
  const location = useLocation();
  const navigate = useNavigate();

  const HandleNavigate_to_login = () =>{
    navigate('/auth/signin');
  }

  return (
    <nav className='user-navbar-container'>
      <ul className='ul-user-navbar'>
        <li className='li-user-navbar'>
          <Link
            to="/visitor"
            className={`a-user-navbar ${location.pathname === '/visitor' ? 'active' : ''}`}
          >
            Virtual Tour
          </Link>
        </li>
        <li className='li-user-navbar'>
          <Link
            to="/visitor/vacant-lot"
            className={`a-user-navbar ${location.pathname === '/visitor/vacant-lot' ? 'active' : ''}`}
          >
            Vacant Lot
          </Link>
        </li>

      </ul>
      <button className='user-navbar-signoutButton' onClick={HandleNavigate_to_login}>
        Login
      </button>
    </nav>
  );
}
