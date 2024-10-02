import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';

export function SearchBar({ setSearchQuery }) {
  return (
    <div className="Input-wrapper">
      <FaSearch id="search-icon" />
      <input 
        placeholder="Type to Search" 
        id="burial-search-input"
        onChange={(e) => setSearchQuery(e.target.value)}
      /> 
    </div>
  );
}
