import { Link } from 'react-router-dom';
import './navbar.css';

export default function Navbar() {
  return (
    <nav>
      <div id="navlogo">LOGO</div>
      <ul>
        <li><Link to="/">Virtual Tour</Link></li>
        <li><Link to="/cementerylot">Cementery Lot</Link></li>
        <li><Link to="/BurialSearch">Burial Search</Link></li>
        
      </ul>
    </nav>
  );
}
