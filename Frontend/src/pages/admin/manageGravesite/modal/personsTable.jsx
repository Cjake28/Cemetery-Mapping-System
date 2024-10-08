import { BsFillPencilFill, BsExclamationCircle } from 'react-icons/bs';
// import './verifiedusertable.css';
import { useState } from 'react';
// import EnableUserModal from '../modal/enableUserModal.jsx'; // Assuming you created this modal already

export default function PersonsTable({ persons }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // const handleReverifyClick = (user) => {
    //     setSelectedUser(user);
    //     setIsModalOpen(true);
    // };

    return (
        <div className="table-wrapper">
            <table className="user-table">
                <thead className="user-table-head">
                    <tr className="user-table-row">
                        <th className="user-table-heading">Name</th>
                        <th className="user-table-heading">Location</th>
                        <th className="user-table-heading">Owner name</th>
                        <th className="user-table-heading">Actions</th>
                    </tr>
                </thead>
                <tbody id="user-table-body">
                    {persons != null && persons.length > 0 && persons?.map((person) => (
                        <tr  className="user-table-row user-table-row-content">
                            <td className="user-table-cell">{person.fullname}</td>
                            <td className="user-table-cell">{person.location}</td>
                            <td className="user-table-cell">{person.owner_name}</td>
                            <td className="user-table-cell">
                                <span className="user-actions">
                                    <BsFillPencilFill 
                                        className="edit-icon" 
                                        // onClick={() => handleReverifyClick(user)} 
                                    />
                                    <BsExclamationCircle className="edit-icon"  />
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Enable User Modal */}
            {/* {selectedUser && (
                <EnableUserModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    name={selectedUser.name}
                    userID={selectedUser.id}
                />
            )} */}
        </div>
    );
}
