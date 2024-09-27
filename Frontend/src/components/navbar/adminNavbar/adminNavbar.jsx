import { Link } from 'react-router-dom';
import './adminNavbar.css';
import { AlignJustify } from 'lucide-react';

export default function Adminnavbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Burial Search</Link></li>
        <li><Link to="/cementerylot">Cementery Lot</Link></li>
        <li><Link to="/VirtualTour">Virtual Tour</Link></li>
      </ul>
      <AlignJustify />
    </nav>
  );
}
