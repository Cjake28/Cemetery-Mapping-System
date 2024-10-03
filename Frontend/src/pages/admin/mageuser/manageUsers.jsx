import './manageUser.css';
import VerifieduserTable from './table/verifieduserTable.jsx';
import UnVerifieduserTable from './table/underifiedUsertable.jsx'
import { useState } from 'react';

export default function ManageUsers() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('valid'); // Track active filter

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleFilterToggle = (filter) => {
        setActiveFilter(filter); // Update active filter when clicked
    };

    return (
        <div id="manageuser-container">
            {/* Row with Valid User, Invalid User and Create New Button */}
            <div className="manageuser-top">
                <div className="user-filters">
                    <button
                        className={`valid-user-btn ${activeFilter === 'valid' ? 'active' : ''}`}
                        onClick={() => handleFilterToggle('valid')}
                    >
                        Valid User
                    </button>
                    <button
                        className={`invalid-user-btn ${activeFilter === 'invalid' ? 'active' : ''}`}
                        onClick={() => handleFilterToggle('invalid')}
                    >
                        Invalid User
                    </button>
                </div>
                <div className="create-user">
                    <button className="create-user-btn">Create New User</button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            {/* Table */}
            {activeFilter === 'valid' ? 
            <VerifieduserTable searchQuery={searchQuery} /> 
            : 
            <UnVerifieduserTable searchQuery={searchQuery} />}
            
        </div>
    );
}
