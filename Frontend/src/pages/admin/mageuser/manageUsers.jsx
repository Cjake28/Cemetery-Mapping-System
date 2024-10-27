import './manageUser.css';
import VerifieduserTable from './table/verifieduserTable.jsx';
import UnVerifieduserTable from './table/underifiedUsertable.jsx';
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import ModalCreateUser from './modal/createUserModal.jsx'; // Import the modal component
import { useAuth } from '../../../Context/authContext.jsx';
    const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function ManageUsers() {
    const { checkAuth, isCheckingAuth } = useAuth();
    const handlerequest = async() =>{
        await axios.get(`${API_URL}/api/checkcookies`, { withCredentials: true })

        console.log('clicked');
    }

    const handelcheckAuth = async() =>{
        const response = await axios.get(`${API_URL}/api/auth/check-auth`, { withCredentials: true })
        console.log('checkAuthCLiked: ',response);
    }
    // const [searchQuery, setSearchQuery] = useState('');
    // const [activeFilter, setActiveFilter] = useState('valid');
    // const [isModalOpen, setIsModalOpen] = useState(false);

    // const queryClient = useQueryClient();

    // // Fetch verified users with error handling
    // const { data: verifiedUser, isLoading: userloading, error: userError } = useQuery({
    //     queryKey: ['verifiedUser'],
    //     queryFn: async () => {
    //         try {
    //             const response = await axios.get('http://localhost:9220/api/admin/all-users');
    //             console.log("manageUser: get all users");
    //             console.log(response);
    //             return response.data.users;
    //         } catch (error) {
    //             console.error('Error fetching verified users:', error);
    //             throw new Error('Failed to fetch verified users.');
    //         }
    //     }
    // });

    // // Fetch unverified users with error handling
    // const { data: unverifiedUser, isLoading: unVUserloading, error: unVuserError } = useQuery({
    //     queryKey: ['UnVerifiedUser'],
    //     queryFn: async () => {
    //         try {
    //             const response = await axios.get('http://localhost:9220/api/admin/all-unverify-users');
    //             console.log("UnVerifiedUser: ", response.data.unverifiedUsers);
    //             return response.data.unverifiedUsers;
    //         } catch (error) {
    //             console.error('Error fetching unverified users:', error);
    //             throw new Error('Failed to fetch unverified users.');
    //         }
    //     }
    // });

    // const handleSearch = (event) => {
    //     setSearchQuery(event.target.value);
    // };

    // const handleFilterToggle = (filter) => {
    //     setActiveFilter(filter);
    // };

    // const filteredPersons = activeFilter === 'valid' ? 
    //     verifiedUser?.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase())) : 
    //     unverifiedUser?.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()));

    // // Loading and error states
    // if (userloading && unVUserloading) return <div>Loading...</div>;
    // if (userError) return <div>Error fetching verified users: {userError.message}</div>;
    // if (unVuserError) return <div>Error fetching unverified users: {unVuserError.message}</div>;

    return (
        <div id="manageuser-container"> 
            <button onClick={() => handlerequest()}>cookies</button> 
            <button onClick={() => handelcheckAuth()}>checkAuth</button>  
        </div>
        // <div id="manageuser-container">
        //     <div className="manageuser-top">
        //         <div className="user-filters">
        //             <button
        //                 className={`valid-user-btn ${activeFilter === 'valid' ? 'active' : ''}`}
        //                 onClick={() => handleFilterToggle('valid')}
        //             >
        //                 Valid User
        //             </button>
        //             <button
        //                 className={`invalid-user-btn ${activeFilter === 'invalid' ? 'active' : ''}`}
        //                 onClick={() => handleFilterToggle('invalid')}
        //             >
        //                 Invalid User
        //             </button>
        //         </div>
        //         <div className="create-user">
        //             <button 
        //                 className="create-user-btn" 
        //                 onClick={() => setIsModalOpen(true)} // Open modal on button click
        //             >
        //                 Create New User
        //             </button>
        //         </div>
        //     </div>

        //     <div className="search-bar">
        //         <input
        //             type="text"
        //             placeholder="Search users..."
        //             value={searchQuery}
        //             onChange={handleSearch}
        //         />
        //     </div>

        //     {activeFilter === 'valid' ? 
        //         <VerifieduserTable searchQuery={searchQuery} filteredPersons={filteredPersons}/> : 
        //         <UnVerifieduserTable searchQuery={searchQuery} filteredPersons={filteredPersons}/>}

        //     {/* Modal for creating a new user */}
        //     <ModalCreateUser 
        //         isOpen={isModalOpen} 
        //         onClose={() => setIsModalOpen(false)}
        //     />
        // </div>
    );
}
