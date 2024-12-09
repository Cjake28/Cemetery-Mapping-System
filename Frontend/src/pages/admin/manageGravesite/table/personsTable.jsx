import { BsFillTrashFill, BsFillPencilFill, BsGeoAltFill } from 'react-icons/bs';
import { useState } from 'react';
import DeletePersonModal from '../modal/deletePersonModal.jsx';
import UpdateGraveLocationModal from '../modal/updateGraveLocationModal.jsx';  // Import the new modal
import {useQueryClient } from '@tanstack/react-query';
import UpdatePersonModal from '../modal/updatePersonModal.jsx'; 
import './personTable.css'

export default function PersonsTable({ filteredPersons }) {
    const queryClient = useQueryClient()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alpheticalOrder, setAlpheticalOrder] = useState(filteredPersons);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isGeoModalOpen, setIsGeoModalOpen] = useState(false);  // For updating location modal
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const handleDeleteClick = (person) => {
        setSelectedPerson(person);
        setIsDeleteModalOpen(true);
    };

    const handleGeoClick = (person) => {
        setSelectedPerson(person);
        setIsGeoModalOpen(true);  // Open the update location modal
    };

    const handleUpdateSuccess = () => {
        setIsGeoModalOpen(false);  // Close the modal after successful update
        queryClient.invalidateQueries(['persons']);
    };

    const handleEditClick = (person) => {
        setSelectedPerson(person);
        setIsUpdateModalOpen(true);
    };

    const handleAplhabeticalByName = () => {
        const sortedData = [...filteredPersons].sort((a, b) => a.name.localeCompare(b.name));
        setAlpheticalOrder(sortedData);
    };

    const handleAplhabeticalByOwner = () => {
        const sortedData = [...filteredPersons].sort((a, b) => a.owner_name.localeCompare(b.owner_name));
        setAlpheticalOrder(sortedData);
    };

    return (
        <div className="table-wrapper">
            <table className="user-table">
                <thead className="user-table-head">
                    <tr className="user-table-row">
                        <th className="user-table-heading name_owner_hover" style={{cursor:'pointer'}}  onClick={handleAplhabeticalByName}>Name</th>
                        <th className="user-table-heading">Location</th>
                        <th className="user-table-heading name_owner_hover"  style={{cursor:'pointer'}} onClick={handleAplhabeticalByOwner}>Owner Name</th>
                        <th className="user-table-heading">Actions</th>
                    </tr>
                </thead>
                <tbody id="user-table-body">
                    {alpheticalOrder && alpheticalOrder.length > 0 ? (
                        alpheticalOrder.map((person) => (
                            <tr className="user-table-row user-table-row-content" key={person.id}>
                                <td className="user-table-cell">{person.fullname || `${person.name} ${person.surname}`}</td>
                                <td className="user-table-cell">{person.location || 'N/A'}</td>
                                <td className="user-table-cell">{person.owner_name || 'N/A'}</td>
                                <td className="user-table-cell">
                                    <span className="user-actions">
                                        <BsFillPencilFill 
                                            className="edit-icon" 
                                            onClick={() => handleEditClick(person)} 
                                        />
                                        
                                        <BsGeoAltFill 
                                            className="geo-icon" 
                                            onClick={() => handleGeoClick(person)}  // Handle click to open location modal
                                        />
                                        <BsFillTrashFill 
                                            className="delete-icon" 
                                            onClick={() => handleDeleteClick(person)} 
                                        />
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No persons found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal for Deleting a Person */}
            {selectedPerson && (
                <DeletePersonModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    name={selectedPerson.name}
                    personID={selectedPerson.id}
                    person={selectedPerson}
                />
            )}

            {/* Modal for Updating Grave Location */}
            {selectedPerson && (
                <UpdateGraveLocationModal
                    isOpen={isGeoModalOpen}
                    onClose={() => setIsGeoModalOpen(false)}
                    person={selectedPerson}
                    onUpdateSuccess={handleUpdateSuccess}
                />
            )}

            {selectedPerson && (
                <UpdatePersonModal
                    isOpen={isUpdateModalOpen}
                    onClose={() => setIsUpdateModalOpen(false)}
                    person={selectedPerson}
                    onUpdateSuccess={handleUpdateSuccess}
                />
            )}
        </div>
    );
}
