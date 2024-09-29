import { Link } from 'react-router-dom';
import './userNavbar.css';
import { AlignJustify } from 'lucide-react';
import { useAuth } from '../../../Context/authContext.jsx';
export default function Usernavbar() {
  const { signout } = useAuth();
  return (
    <nav>
      <ul>
        <li><Link to="/">Burial Search</Link></li>
        <li><Link to="/cementerylot">Cementery Lot</Link></li>
        <li><Link to="/VirtualTour">Virtual Tour</Link></li>
        <AlignJustify onClick={()=>{
          signout();
          }}/>
      </ul>
    </nav>
  );
}
