import './managevacantLot.css';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import VacantLOtTable from './table/vacantLotTable.jsx';


export default function ManageVacantLot() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch persons data with useQuery
  const { data: vacantLots, isLoading, error } = useQuery({
    queryKey: ['vacantLots'],
    queryFn: async () => {
        try {
            const response = await axios.get('http://localhost:9220/api/vacantlots');
            console.log(response);
            return response.data.data; // Assuming 'vacantLots' is the correct field in your response
        } catch (err) {
            throw new Error(err.response?.data?.message || 'Failed to fetch vacant lots.');
        }
    },
    retry: 3, // Retry failed request up to 3 times
    retryDelay: 1000, // Wait 1 second before retrying
    refetchOnWindowFocus: false, // Don't refetch when the window is refocused
});

  // Handle person creation without using useMutation (e.g., using axios directly)
    // const handleCreatePerson = async (personData) => {
    //     try {
    //         await axios.post('http://localhost:9220/api/admin/create-person', personData);
    //     // Optionally refetch the persons data after successful creation
    //     //   queryClient.invalidateQueries(['persons']);
    //     } catch (err) {
    //         console.error('Error creating person:', err);
    //     }
    //     setIsModalOpen(false); // Close modal after creating
    // };

    const handleSearch = (event) => {
      setSearchQuery(event.target.value);
  };
  
  const filteredLots = vacantLots?.filter((lot) => 
      lot.owner_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lot.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
    
  if (isLoading) return <div>Loading vacant lots...</div>;
  if (error) return <div>Error fetching vacant lots: {error.message}</div>;
  

  return (
    <div id="manageVacantLot-container">
      <div className="manageuser-top">
        <div className="create-vacnatLot">
          <button className="create-person-btn" >
            Create vacant Lot
          </button>
        </div>
      </div>

      <div className="search-bar-vacatLot">
        <input
            className='inputVacant-lot' 
            type="text" 
            placeholder="Search persons..." 
            // value={searchQuery}
            // onChange={handleSearch}
        />
      </div>

      <VacantLOtTable filteredLots={filteredLots}/>

      {/* {isModalOpen && (
        <CreatePersonModal
          onClose={() => setIsModalOpen(false)}
          onCreatePerson={handleCreatePerson}
        />
      )} */}
    </div>
  );
}
