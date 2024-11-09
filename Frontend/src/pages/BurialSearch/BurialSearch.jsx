// BurialSearch.jsx
import './BurialSearch.css';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocationContext } from '../../Context/SceneIDcontext.jsx';
import { GeolocationContext } from '../../Context/geolocationContext.jsx';
import PrivacyModal from './modal/PrivacyModal.jsx';
import ResultModal from './modal/resultModal.jsx';

import ExampleImage from '../../assets/himlayanSearchText.png';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function BurialSearch() {
  const { requestLocationPermission } = GeolocationContext();
  const { handleLatlngObjConvertion, setScene } = useLocationContext();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [surname, setSurname] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [dateOfDeath, setDateOfDeath] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const { data: persons, isLoading, error } = useQuery({
    queryKey: ['persons'],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/api/get-all-person`);
      return response.data.persons;
    }
  });

  const handleSearch = () => {
    
    const filteredPersons = persons?.filter((person) =>
      person.name === name &&
      person.middle_name === middleName &&
      person.surname === surname &&
      new Date(person.date_of_birth).toISOString().slice(0, 10) === dateOfBirth &&
      new Date(person.date_of_death).toISOString().slice(0, 10) === dateOfDeath
      
    );
    console.log("dateOfBirth: ", dateOfBirth);
    console.log(new Date(persons[0].date_of_birth).toISOString().slice(0, 10));
    console.log(persons[0]);
    setSearchResults(filteredPersons);
    setIsResultModalOpen(true);
  };

  const handleCloseResultModal = () => setIsResultModalOpen(false);

  const handleOpenMap = () => {
    handleLatlngObjConvertion(searchResults[0].center_lat_lng);
    handleCloseResultModal();
    setScene(true);
  }


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="Burial_Search_Container">
      {isModalOpen && <PrivacyModal onClose={() => setIsModalOpen(false)} />}

      <div className="image-container">
        <img src={ExampleImage} alt="Descriptive Text" className="example-image" />
      </div>

      <div className="Search-Bar-container">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Middle Name"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date of Death"
          value={dateOfDeath}
          onChange={(e) => setDateOfDeath(e.target.value)}
        />
        
        <button onClick={handleSearch}>Search</button>
      </div>

      <ResultModal
        isOpen={isResultModalOpen}
        onClose={handleCloseResultModal}
        searchResults={searchResults}
        openMap={handleOpenMap}
      />
    </div>
  );
}
