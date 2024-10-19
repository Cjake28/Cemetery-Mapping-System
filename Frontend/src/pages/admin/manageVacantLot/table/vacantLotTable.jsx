import { BsFillTrashFill, BsExclamationCircle, BsGeoAltFill } from 'react-icons/bs';
import { useState } from 'react';
import UpdateVacantLotModal from '../modal/updateLotModal.jsx';
import DeleteVacantLotModal from '../modal/deleteLotModal.jsx'
import './vacantlottbale.css';
// import DeleteVacantLotModal from '../modal/DeleteVacantLotModal.jsx';  // Assume you have a delete modal as well


export default function VacantLotTable({ filteredLots }) {
    const [selectedLot, setSelectedLot] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isGeoModalOpen, setIsGeoModalOpen] = useState(false);

    const handleDeleteClick = (lot) => {
        setSelectedLot(lot);
        setIsDeleteModalOpen(true);
    };

    const handleGeoClick = (lot) => {
        setSelectedLot(lot);
        setIsGeoModalOpen(true);
    };

    const handleUpdateSuccess = () => {
        setIsGeoModalOpen(false);  // Close the modal after successful update
        // Optionally refetch data or update UI to reflect the changes
    };

    const handelupdatemodalClose = () => {
        setSelectedLot(null);
        setIsGeoModalOpen(false);
    }

    const handelDeletemodalClose = () => {
        setSelectedLot(null);
        setIsDeleteModalOpen(false)
    }

    return (
        <div className="vacantlot-table-wrapper">
            <table className="vacantlot-table">
                <thead className="vacantlot-table-head">
                    <tr className="vacantlot-table-row">
                        <th className="vacantlot-table-heading">Location</th>
                        <th className="vacantlot-table-heading">Map coordinates</th>
                        <th className="vacantlot-table-heading">Actions</th>
                    </tr>
                </thead>
                <tbody id="vacantlot-table-body">
                    {filteredLots && filteredLots.length > 0 ? (
                        filteredLots.map((lot) => (
                            <tr className="vacantlot-table-row vacantlot-table-row-content" key={lot.id}>
                                <td className="vacantlot-table-cell">{lot.location || 'N/A'}</td>
                                <td className="vacantlot-table-cell scrollable-cell">{lot.lat_lng_point_center || 'N/A'}</td>
                                <td className="vacantlot-table-cell">
                                    <span className="vacantlot-actions">
                                        <BsGeoAltFill
                                            className="geo-icon"
                                            onClick={() => handleGeoClick(lot)}
                                        />
                                        <BsFillTrashFill
                                            className="delete-icon"
                                            onClick={() => handleDeleteClick(lot)}
                                        />
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

            {selectedLot && (
                <DeleteVacantLotModal
                    isOpen={isDeleteModalOpen}
                    onClose={handelDeletemodalClose}
                    location={selectedLot.location}
                    lotID={selectedLot.id}
                />
            )}

            {/* Modal for Updating Vacant Lot Location */}
            {selectedLot && (
                <UpdateVacantLotModal
                    isOpen={isGeoModalOpen}
                    onClose={handelupdatemodalClose}
                    lot={selectedLot}
                    onUpdateSuccess={handleUpdateSuccess}
                />
            )}
        </div>
    );
}
