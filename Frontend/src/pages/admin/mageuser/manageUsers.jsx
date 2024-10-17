import './manageUser.css';
import VerifieduserTable from './table/verifieduserTable.jsx';
import UnVerifieduserTable from './table/underifiedUsertable.jsx';
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import ModalCreateUser from './modal/createUserModal.jsx'; // Import the modal component

export default function ManageUsers() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('valid');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const queryClient = useQueryClient();

    const { data: verifiedUser, isLoading: userloading, error: userError } = useQuery({
        queryKey: ['verifiedUser'],
        queryFn: async () => {
          const response = await axios.get('http://localhost:9220/api/admin/all-users');
          console.log("manageUser: get all users");
          return response.data.users;
        }
    });

    const { data: unverifiedUser, isLoading: unVUserloading, error: unVuserError } = useQuery({
        queryKey: ['UnVerifiedUser'],
        queryFn: async () => {
          const response = await axios.get('http://localhost:9220/api/admin/all-unverify-users');
          console.log("UnVerifiedUser: ",response.data.unverifiedUsers);
          return response.data.unverifiedUsers;
        }
    });

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleFilterToggle = (filter) => {
        setActiveFilter(filter);
    };

    const filteredPersons = activeFilter === 'valid' ? 
        verifiedUser?.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase())) : 
        unverifiedUser?.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()));

    if (userloading && unVUserloading) return <div>Loading...</div>;
    if (userError) return <div>userError: {userError.message}</div>;
    if (unVuserError) return <div>unVuserError: {unVuserError.message}</div>;

    return (
        <div id="manageuser-container">
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
                    <button 
                        className="create-user-btn" 
                        onClick={() => setIsModalOpen(true)} // Open modal on button click
                    >
                        Create New User
                    </button>
                </div>
            </div>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            {activeFilter === 'valid' ? 
                <VerifieduserTable searchQuery={searchQuery} filteredPersons={filteredPersons}/> : 
                <UnVerifieduserTable searchQuery={searchQuery} filteredPersons={filteredPersons}/>}

            {/* Modal for creating a new user */}
            <ModalCreateUser 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}
