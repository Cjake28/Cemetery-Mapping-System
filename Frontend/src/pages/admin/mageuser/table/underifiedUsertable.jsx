import { BsFillPencilFill } from 'react-icons/bs';
import './verifiedusertable.css';
import { useState } from 'react';
import EnableUserModal from '../modal/enableUserModal.jsx'; // Assuming you created this modal already

export default function UnVerifieduserTable({ filteredPersons }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleReverifyClick = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
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
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Enable User Modal */}
            {selectedUser && (
                <EnableUserModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    name={selectedUser.name}
                    userID={selectedUser.id}
                />
            )}
        </div>
    );
}
