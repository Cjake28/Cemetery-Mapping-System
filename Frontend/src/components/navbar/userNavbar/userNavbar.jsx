import { Link } from 'react-router-dom';
import './userNavbar.css';
import { AlignJustify } from 'lucide-react';
export default function Usernavbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Burial Search</Link></li>
        <li><Link to="/cementerylot">Cementery Lot</Link></li>
        <li><Link to="/VirtualTour">Virtual Tour</Link></li>
        <AlignJustify onClick={()=>console.log("click")}/>
      </ul>
    </nav>
  );
}
