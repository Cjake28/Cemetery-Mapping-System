import './manageGravesite.css';
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import PersonsTable from './table/personsTable.jsx';
import CreatePersonModal from './modal/createPersonModal.jsx';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function ManageGraveSite() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sortedPersons, setSortedPersons] = useState(null);
    const queryClient = useQueryClient();
    
  // Fetch persons data with useQuery
    const { data: persons, isLoading, error } = useQuery({
        queryKey: ['persons'],
        queryFn: async () => {
            const response = await axios.get(`${API_URL}/api/get-all-person`);
            return response.data.persons;
        },
    });

  // Handle person creation without using useMutation (e.g., using axios directly)
    const handleCreatePerson = async (personData) => {
        try {
            await axios.post(`${API_URL}/api/admin/create-person`, personData);
            //refetch the persons data after successful creation
            queryClient.invalidateQueries(['persons']);
        } catch (err) {
            console.error('Error creating person:', err);
        }
        setIsModalOpen(false); // Close modal after creating
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setAlpheticalOrder(filteredPersons);
    };

    const handleAlphabeticalByName = () => {
      const sorted = [...persons].sort((a, b) => a.name.localeCompare(b.name));
      setSortedPersons(sorted);
  };

  const handleAlphabeticalByOwner = () => {
      const sorted = [...persons].sort((a, b) => a.owner_name.localeCompare(b.owner_name));
      setSortedPersons(sorted);
  };

  // Filtered and sorted persons
  const filteredPersons = (sortedPersons || persons)?.filter(
      (person) =>
          person.fullname.toLowerCase().includes(searchQuery.toLowerCase()) 
          // person.surname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching persons</div>;

  return (
    <div id="manageGravesite-container">
      <div className="manageuser-top">
        <div className="create-person">
          <button className="create-person-btn" onClick={() => setIsModalOpen(true)}>
            Create New Person
          </button>
        </div>
      </div>

      <div className="search-bar">
        <input 
            type="text" 
            placeholder="Search person..." 
            value={searchQuery}
            onChange={handleSearch}
        />
      </div>

        <PersonsTable
          filteredPersons={filteredPersons}
          handleAlphabeticalByName={handleAlphabeticalByName}
          handleAlphabeticalByOwner={handleAlphabeticalByOwner}
        />

      {isModalOpen && (
        <CreatePersonModal
          onClose={() => setIsModalOpen(false)}
          onCreatePerson={handleCreatePerson}
        />
      )}
    </div>
  );
}
