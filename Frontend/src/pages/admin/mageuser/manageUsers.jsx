import './manageUser.css';
import VerifieduserTable from './table/verifieduserTable.jsx';
import UnVerifieduserTable from './table/underifiedUsertable.jsx'
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function ManageUsers() {
    
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('valid'); // Track active filter
    

    const { data: verifiedUser, isLoading:  userloading, error: userError } = useQuery({
        queryKey: ['verifiedUser'],
        queryFn: async () => {
          const response = await axios.get('http://localhost:9220/api/admin/all-users');
          console.log("manageUser: get all users");
          return response.data.users; // Corrected return to match the logged structure
        }
      });

      const { data: unverifiedUser, isLoading:  unVUserloading, error: unVuserError } = useQuery({
        queryKey: ['UnVerifiedUser'],
        queryFn: async () => {
          const response = await axios.get('http://localhost:9220/api/admin/all-unverify-users');
          console.log("UnVerifiedUser: ",response.data.unverifiedUsers);
          return response.data.unverifiedUsers; // Corrected return to match the logged structure
        }
      });
      
    useEffect(()=>{
        console.log("console users: ",verifiedUser)
    },[verifiedUser]);
    useEffect(()=>{
        console.log("console unverifiedUser: ",unverifiedUser)
    },[unverifiedUser]);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleFilterToggle = (filter) => {
        setActiveFilter(filter); // Update active filter when clicked
    };

    if (userloading && unVUserloading) return <div>Loading...</div>;
    if (userError ) return <div>userError: {userError.message}</div>;
    if (unVuserError) return <div>unVuserError: {unVuserError.message}</div>;
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
            <VerifieduserTable searchQuery={searchQuery} verifiedUser={verifiedUser}/> 
            : 
            <UnVerifieduserTable searchQuery={searchQuery} />}
            
        </div>
    );
}
