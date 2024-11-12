import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';
import './verifiedusertable.css';
import { useState } from 'react';
import EnableUserModal from '../modal/enableUserModal.jsx';
import DeleteUserModal from '../modal/deleteUserModal.jsx'; // Import DeleteUserModal

export default function UnVerifieduserTable({ filteredPersons, checkboxHandler, selectedID }) {
    const [isReverifyModalOpen, setIsReverifyModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleReverifyClick = (user) => {
        setSelectedUser(user);
        setIsReverifyModalOpen(true);
    };

    const handleDeleteClick = (user) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const isChecked = (id) =>
        selectedID.some((user) => user.id === id);
    
    return (
        <div className="table-wrapper">
            <table className="user-table">
                <thead className="user-table-head">
                    <tr className="user-table-row">
                        <th className="user-table-heading">Name</th>
                        <th className="user-table-heading">Username</th>
                        <th className="user-table-heading">Role</th>
                        <th className="user-table-heading">Actions</th>
                    </tr>
                </thead>
                <tbody id="user-table-body">
                    {filteredPersons.map((user) => (
                        <tr key={user.username} className="user-table-row user-table-row-content">
                            <td className="user-table-cell">{user.name}</td>
                            <td className="user-table-cell">{user.username}</td>
                            <td className="user-table-cell">{user.role}</td>
                            <td className="user-table-cell">
                                <span className="user-actions">
                                    <BsFillPencilFill 
                                        className="edit-icon" 
                                        onClick={() => handleReverifyClick(user)} 
                                    />
                                    <BsFillTrashFill 
                                        className="delete-icon"
                                        onClick={() => handleDeleteClick(user)} // Open delete modal on click
                                    />
                                    <input
                                        type="checkbox"
                                        checked={isChecked(user.id)} // Check if user is selected
                                        value={JSON.stringify({ id: user.id, name: user.name })} // Pass `name` and `id` as JSON
                                        onChange={checkboxHandler}
                                    />
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Reverify User Modal */}
            {selectedUser && (
                <EnableUserModal
                    isOpen={isReverifyModalOpen}
                    onClose={() => setIsReverifyModalOpen(false)}
                    name={selectedUser.name}
                    userID={selectedUser.id}
                />
            )}

            {/* Delete User Modal */}
            {selectedUser && (
                <DeleteUserModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    name={selectedUser.name}
                    UserId={selectedUser.id} // Pass the user ID to DeleteUserModal
                />
            )}
        </div>
    );
}
