import { BsFillTrashFill, BsExclamationCircle, BsGeoAltFill } from 'react-icons/bs';
import { useState } from 'react';
// import DeletePersonModal from '../modal/deletePersonModal.jsx';
// import UpdateGraveLocationModal from '../modal/updateGraveLocationModal.jsx';  // Import the new modal

export default function VacantLOtTable({ filteredLots }) {
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
                        <th className="user-table-heading">Location</th>
                        <th className="user-table-heading">Map coordinates</th>
                        <th className="user-table-heading">Actions</th>
                    </tr>
                </thead>
                <tbody id="user-table-body">
                    {filteredLots && filteredLots.length > 0 ? (
                        filteredLots.map((lot) => (
                            <tr className="user-table-row user-table-row-content" key={lot.id}>
                                <td className="user-table-cell">{lot.location || 'N/A'}</td>
                                <td className="user-table-cell">{lot.lat_lng_point_center || 'N/A'}</td>
                                <td className="user-table-cell">
                                    <span className="user-actions">
                                        <BsExclamationCircle className="edit-icon" />
                                        <BsFillTrashFill className="delete-icon" />
                                        {/* Add click handlers for actions if needed */}
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No vacant lots found</td>
                        </tr>
                    )}
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
