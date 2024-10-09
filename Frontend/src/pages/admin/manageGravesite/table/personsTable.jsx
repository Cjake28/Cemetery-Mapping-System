import { BsFillTrashFill, BsExclamationCircle } from 'react-icons/bs';
import { useState } from 'react';
import DeletePersonModal from '../modal/deletePersonModal.jsx';

export default function PersonsTable({ filteredPersons }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPerson, setSelectedPeron] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = (filteredPersons) => {
    console.log("handled person CLick:", filteredPersons)
    setSelectedPeron(filteredPersons);
    setIsDeleteModalOpen(true);
};

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
          {filteredPersons && filteredPersons.length > 0 ? (
            filteredPersons.map((person) => (
              <tr className="user-table-row user-table-row-content" key={person.id}>
                <td className="user-table-cell">{person.fullname || `${person.name} ${person.surname}`}</td>
                <td className="user-table-cell">{person.location || 'N/A'}</td>
                <td className="user-table-cell">{person.owner_name || 'N/A'}</td>
                <td className="user-table-cell">
                  <span className="user-actions">
                    <BsExclamationCircle className="edit-icon" />
                    <BsFillTrashFill 
                        className="edit-icon" 
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

      {selectedPerson && (
                <DeletePersonModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    name={selectedPerson.name}
                    personID={selectedPerson.id}
                />
            )}
    </div>
  );
}
