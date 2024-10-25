import './managevacantlot.css';
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import VacantLOtTable from './table/vacantLotTable.jsx';
import CreateVacantLotModal from './modal/createVacantLotModal.jsx';

export default function ManageVacantLot() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const queryClient = useQueryClient();

    // Fetch vacant lots data with useQuery
    const { data: vacantLots, isLoading, error } = useQuery({
        queryKey: ['vacantLots'],
        queryFn: async () => {
            try {
                const response = await axios.get('/api/vacantlots');
                return response.data.data; // Assuming 'vacantLots' is the correct field in your response
            } catch (err) {
                throw new Error(err.response?.data?.message || 'Failed to fetch vacant lots.');
            }
        },
        retry: 3, // Retry failed request up to 3 times
        retryDelay: 1000, // Wait 1 second before retrying
        refetchOnWindowFocus: false, // Don't refetch when the window is refocused
    });

    // Function to handle successful creation of vacant lot
    const handleCreateSuccess = () => {
        // Refetch vacant lots after a new lot is created
        queryClient.invalidateQueries(['vacantLots']);
    };

    // Handle search query input
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter the vacant lots based on search query
    const filteredLots = vacantLots?.filter((lot) => 
        lot.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (isLoading) return <div>Loading vacant lots...</div>;
    if (error) return <div>Error fetching vacant lots: {error.message}</div>;

    return (
        <div id="manageVacantLot-container">

          <div className="manageuser-top">
            <div className="create-vacnatLot">
              <button className="create-person-btn" onClick={()=>setIsCreateModalOpen(true)} >
                Create vacant Lot
              </button>
            </div>
          </div>

          <div className="search-bar-vacatLot">
            <input
                className='inputVacant-lot' 
                type="text" 
                placeholder="Search persons..." 
                value={searchQuery}
                onChange={handleSearch}
            />
          </div>

            {/* Vacant Lots Table */}
            <VacantLOtTable filteredLots={filteredLots} />

            {/* Create Vacant Lot Modal */}
            {isCreateModalOpen && (
                <CreateVacantLotModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onCreateSuccess={handleCreateSuccess}  // Pass success handler
                />
            )}
        </div>
    );
}
