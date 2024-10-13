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
            to="/vistor"
            className={`a-user-navbar ${location.pathname === '/visitor' ? 'active' : ''}`}
          >
            Virtual Tour
          </Link>
        </li>

      </ul>
      <button className='user-navbar-signoutButton' onClick={HandleNavigate_to_login}>
        Login
      </button>
    </nav>
  );
}
