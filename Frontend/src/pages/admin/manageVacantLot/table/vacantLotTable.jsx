import { BsFillTrashFill, BsExclamationCircle, BsGeoAltFill } from 'react-icons/bs';
import { useState } from 'react';
// import DeletePersonModal from '../modal/deletePersonModal.jsx';
// import UpdateGraveLocationModal from '../modal/updateGraveLocationModal.jsx';  // Import the new modal

export default function VacantLOtTable({ filteredPersons }) {
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    // const [isGeoModalOpen, setIsGeoModalOpen] = useState(false);  // For updating location modal

    const handleDeleteClick = (person) => {
        setSelectedPerson(person);
        setIsDeleteModalOpen(true);
    };

    // const handleUpdateSuccess = () => {
    //     setIsGeoModalOpen(false);  // Close the modal after successful update
    //     // Optionally refetch data or update UI to reflect the changes
    // };

    return (
        <div className="table-wrapper">
            <table className="user-table">
                <thead className="user-table-head">
                    <tr className="user-table-row">
                        <th className="user-table-heading">Name</th>
                        <th className="user-table-heading">Location</th>
                        <th className="user-table-heading">Owner Name</th>
                        <th className="user-table-heading">Actions</th>
                    </tr>
                </thead>
                <tbody id="user-table-body">

                <tr className="user-table-row user-table-row-content" >
                                <td className="user-table-cell">location Lot</td>
                                <td className="user-table-cell">Map location</td>
                                <td className="user-table-cell">
                                    <span className="user-actions">
                                        <BsExclamationCircle className="edit-icon" />
                                        <BsFillTrashFill 
                                            className="delete-icon" 
                                            // onClick={() => handleDeleteClick(person)} 
                                        />
                                    </span>
                                </td>
                            </tr>
                    {/* {filteredPersons && filteredPersons.length > 0 ? (
                        filteredPersons.map((person) => (
                            <tr className="user-table-row user-table-row-content" key={person.id}>
                                <td className="user-table-cell">{person.fullname || `${person.name} ${person.surname}`}</td>
                                <td className="user-table-cell">{person.location || 'N/A'}</td>
                                <td className="user-table-cell">{person.owner_name || 'N/A'}</td>
                                <td className="user-table-cell">
                                    <span className="user-actions">
                                        <BsExclamationCircle className="edit-icon" />
                                        <BsFillTrashFill 
                                            className="delete-icon" 
                                            onClick={() => handleDeleteClick(person)} 
                                        />
                                        <BsGeoAltFill 
                                            className="geo-icon" 
                                            onClick={() => handleGeoClick(person)}  // Handle click to open location modal
                                        />
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No vacant lot found</td>
                        </tr>
                    )} */}
                </tbody>
            </table>

            {/* Modal for Deleting a Person */}
            {/* {selectedPerson && (
                <DeletePersonModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    name={selectedPerson.name}
                    personID={selectedPerson.id}
                />
            )} */}

            {/* Modal for Updating Grave Location */}
            {/* {selectedPerson && (
                <UpdateGraveLocationModal
                    isOpen={isGeoModalOpen}
                    onClose={() => setIsGeoModalOpen(false)}
                    person={selectedPerson}
                    onUpdateSuccess={handleUpdateSuccess}
                />
            )} */}
        </div>
    );
}
