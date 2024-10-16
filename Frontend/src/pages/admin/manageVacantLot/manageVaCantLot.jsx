// import './manageGravesite.css';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import VacantLOtTable from './table/vacantLotTable.jsx';


export default function ManageVacantLot() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch persons data with useQuery
    // const { data: persons, isLoading, error } = useQuery({
    //     queryKey: ['persons'],
    //     queryFn: async () => {
    //         const response = await axios.get('http://localhost:9220/api/get-all-person');
    //         return response.data.persons;
    //     },
    // });

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

    // const handleSearch = (event) => {
    //     setSearchQuery(event.target.value);
    // };

    // const filteredPersons =  persons?.filter((person) => person.name.toLowerCase().includes(searchQuery.toLowerCase()) || person.surname.toLowerCase().includes(searchQuery.toLowerCase()));

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error fetching persons</div>;

  return (
    <div id="manageGravesite-container">
      <div className="manageuser-top">
        <div className="create-person">
          <button className="create-person-btn" >
            Create vacant Lot
          </button>
        </div>
      </div>

      <div className="search-bar">
        <input 
            type="text" 
            placeholder="Search persons..." 
            // value={searchQuery}
            // onChange={handleSearch}
        />
      </div>

      <VacantLOtTable filteredPersons={null}/>

      {/* {isModalOpen && (
        <CreatePersonModal
          onClose={() => setIsModalOpen(false)}
          onCreatePerson={handleCreatePerson}
        />
      )} */}
    </div>
  );
}
