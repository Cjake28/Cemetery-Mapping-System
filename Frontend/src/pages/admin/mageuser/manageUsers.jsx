import './manageUser.css';
import VerifieduserTable from './table/verifieduserTable.jsx';
import UnVerifieduserTable from './table/underifiedUsertable.jsx';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import ModalCreateUser from './modal/createUserModal.jsx'; // Import the modal component
import GeneralModal from './modal/generalModal.jsx'

const API_URL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

export default function ManageUsers() {
    const [selectedID, setSelectedID] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('valid');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [title, setTitle] = useState(null);

    const queryClient = useQueryClient();

    // Fetch verified users with error handling
    const { data: verifiedUser, isLoading: userloading, error: userError } = useQuery({
        queryKey: ['verifiedUser'],
        queryFn: async () => {
            try {
                const response = await axios.get(`${API_URL}/api/admin/all-users`);
                // console.log(response);
                return response.data.users;
            } catch (error) {
                console.error('Error fetching verified users:', error);
                throw new Error('Failed to fetch verified users.');
            }
        }
    });

    // Fetch unverified users with error handling
    const { data: unverifiedUser, isLoading: unVUserloading, error: unVuserError } = useQuery({
        queryKey: ['UnVerifiedUser'],
        queryFn: async () => {
            try {
                const response = await axios.get(`${API_URL}/api/admin/all-unverify-users`);
                // console.log("UnVerifiedUser: ", response.data.unverifiedUsers);
                return response.data.unverifiedUsers;
            } catch (error) {
                console.error('Error fetching unverified users:', error);
                throw new Error('Failed to fetch unverified users.');
            }
        }
    });

    const handleConfirm = async (selectedUsers, title) => {

        if(selectedUsers == 0 || selectedUsers == null || !selectedUsers){
            return
        }

        const ids = selectedUsers.map((user) => user.id); // Extract only IDs
        try {
            let response;

            if(title === 'Unverify User'){
                response = await unverifyMultipleUsers(ids); // Call the unverify function
                console.log('Users unverifed successfully:', response);
            }else if(title === 'Delete User'){
                response = await deleteMultipleUsers(ids);
                console.log('Users Delete successfully:', response);
            }else if(title === 'Reverify User'){
                response = await verifyMultipleUsers(ids);
                console.log('Users Reverify successfully:', response);
            }
    
            // Add logic to refresh the table or query data
            setOpenModal(false); // Close modal after success
        } catch (error) {
            console.error('Failed to unverify users:', error.message);
        }
    };

    const unverifyMultipleUsers = async (userIds) => {
        try {
            const response = await axios.patch(`${API_URL}/api/admin/unverify-users`, {
                userIds, // Payload sent to the backend
            });
            queryClient.invalidateQueries(['verifiedUser']);
            queryClient.invalidateQueries(['UnVerifiedUser']);
            return response.data; // Return the API response
        } catch (error) {
            console.error('Error unverifying users:', error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || 'Failed to unverify users.');
        }
    };
    
    const deleteMultipleUsers = async (userIds) => {
        try {
            const response = await axios.delete(`${API_URL}/api/admin/delete-users`, {
                data: { userIds },
            });
            queryClient.invalidateQueries(['UnVerifiedUser']);
            return response.data; // Return the API response
        } catch (error) {
            console.error('Error deleting users:', error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || 'Failed to delete users.');
        }
    };
    
    const verifyMultipleUsers = async (userIds) => {
        try {
            const response = await axios.patch(`${API_URL}/api/admin/reverify-users`, {
                userIds,
            });
            queryClient.invalidateQueries(['verifiedUser']);
            queryClient.invalidateQueries(['UnVerifiedUser']);
            return response.data; // Return the API response
        } catch (error) {
            console.error('Error verifying users:', error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || 'Failed to verify users.');
        }
    };

    const resetQueries = () => {
        queryClient.invalidateQueries(['verifiedUser']);
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleFilterToggle = (filter) => {
        setActiveFilter(filter);
        setSelectedID([]);
    };

    const filteredPersons = activeFilter === 'valid' ? 
        verifiedUser?.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase())) : 
        unverifiedUser?.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()));

    function checkboxHandler(e) {
        const isSelected = e.target.checked;
        const { id, name } = JSON.parse(e.target.value); // Parse JSON string
    
        if (isSelected) {
            setSelectedID([...selectedID, { id, name }]);
        } else {
            setSelectedID((prevData) =>
                prevData.filter((user) => user.id !== id)
            );
        }
    }

    const handleClose = () => {
        console.log('Closed!');
        setOpenModal(false);
    };

    useEffect(()=>{
        console.log("selectedIDSS: ",selectedID);
    },[selectedID]);
    const data = ['John Doe', 'Jane Smith', 'Alice Brown', 'Bob Johnson', 'Charlie Davis'];
    // Loading and error states
    if (userloading && unVUserloading) return <div>Loading...</div>;
    if (userError) return <div>Error fetching verified users: {userError.message}</div>;
    if (unVuserError) return <div>Error fetching unverified users: {unVuserError.message}</div>;

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
                    {activeFilter === 'valid' ? (
                        <button 
                            className="unverified-multp-user" 
                            onClick={()=> {setOpenModal(true); setTitle('Unverify User')}}
                        >
                            Unverify User
                        </button>
                    ) : (
                        <>
                            <button 
                                className="delete-multp-user" 
                                onClick={()=> {setOpenModal(true); setTitle('Delete User')}}
                            >
                                Delete User
                            </button>
                            <button 
                                className="reverified-multp-user" 
                                onClick={()=> {setOpenModal(true); setTitle('Reverify User')}}
                            >
                                Reverify User
                            </button>
                        </>
                    )}

                    <button 
                        className="create-user-btn" 
                        onClick={() => setIsModalOpen(true)} // Open modal on button click
                    >
                        Create User
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
                <VerifieduserTable 
                    searchQuery={searchQuery} 
                    filteredPersons={filteredPersons}
                    checkboxHandler={checkboxHandler}
                    selectedID={selectedID}
                /> : 
                <UnVerifieduserTable 
                    searchQuery={searchQuery} 
                    filteredPersons={filteredPersons}
                    checkboxHandler={checkboxHandler}
                    selectedID={selectedID}
                />}

            {/* Modal for creating a new user */}
            <ModalCreateUser 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                resetQueries={resetQueries}
            />

            {openModal && <GeneralModal
                title= {title}
                data={selectedID.map((user) => user.name) || []}
                onConfirm={() => handleConfirm(selectedID,title )}
                onClose={handleClose}
            />}
        </div>
    );
}
