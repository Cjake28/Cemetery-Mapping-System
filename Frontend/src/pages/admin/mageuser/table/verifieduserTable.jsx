import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import './verifiedusertable.css';
import { useState } from 'react';
import UpdatePasswordModal from '../modal/updatePasswordModal.jsx';
import DisableUserModal from '../modal/disableUserModal.jsx';

export default function VerifieduserTable({ filteredPersons }) {
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isDisableModalOpen, setIsDisableModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setIsPasswordModalOpen(true);
    };

    const handleDisableClick = (user) => {
        setSelectedUser(user);
        setIsDisableModalOpen(true);
    };

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
                    {filteredPersons?.map((user) => (
                        <tr key={user.username} className="user-table-row user-table-row-content">
                            <td className="user-table-cell">{user.name}</td>
                            <td className="user-table-cell">{user.username}</td>
                            <td className="user-table-cell">{user.role}</td>
                            <td className="user-table-cell">
                                <span className="user-actions">
                                    <BsFillPencilFill 
                                        className="edit-icon" 
                                        onClick={() => handleEditClick(user)} 
                                    />
                                    <BsFillTrashFill 
                                        className="delete-icon" 
                                        onClick={() => handleDisableClick(user)} 
                                    />
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Update Password Modal */}
            {selectedUser && (
                <UpdatePasswordModal
                    isOpen={isPasswordModalOpen}
                    onClose={() => setIsPasswordModalOpen(false)}
                    name={selectedUser.name}
                    userID={selectedUser.id}
                />
            )}

            {/* Disable User Modal */}
            {selectedUser && (
                <DisableUserModal
                    isOpen={isDisableModalOpen}
                    onClose={() => setIsDisableModalOpen(false)}
                    name={selectedUser.name}
                    userID={selectedUser.id}
                />
            )}
        </div>
    );
}
