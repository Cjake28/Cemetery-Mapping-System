import './BurialSearch.css';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocationContext } from '../../Context/SceneIDcontext.jsx';
import { GeolocationContext } from '../../Context/geolocationContext.jsx';
import PrivacyModal from './modal/PrivacyModal.jsx';
import ResultModal from './modal/resultModal.jsx';
import ContactComponent from '../../components/contact/contact.jsx'
import ExampleImage from '../../assets/himlayanSearchText.png';

const API_URL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

export default function BurialSearch() {
  const { requestLocationPermission } = GeolocationContext();
  const { handleLatlngObjConvertion, setScene, setPerson_name_loc} = useLocationContext();
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
      person.name.toLowerCase().trim() === name.toLowerCase().trim() &&
      person.middle_name.toLowerCase().trim() === middleName.toLowerCase().trim() &&
      person.surname.toLowerCase().trim() === surname.toLowerCase().trim() &&
      new Date(person.date_of_birth).toISOString().slice(0, 10) === dateOfBirth &&
      new Date(person.date_of_death).toISOString().slice(0, 10) === dateOfDeath
    );
    setSearchResults(filteredPersons);
    setIsResultModalOpen(true);
  };

  const handleCloseResultModal = () => setIsResultModalOpen(false);

  const handleOpenMap = () => {
    console.log("search Result[0]: ",searchResults[0])
    handleLatlngObjConvertion(searchResults[0].center_lat_lng);
    handleCloseResultModal();
    setScene(true);
    setPerson_name_loc({fullname: searchResults[0].fullname, location: searchResults[0].location});
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="burial-search-container">
      {isModalOpen && <PrivacyModal onClose={() => setIsModalOpen(false)} />}

      <div className="image-container">
        <h1 className="burial-search-h1-text-style" >HIMLAYANG LAHING KAYUMANGGI <br /> MEMORIAL PARK</h1>
      </div>

      <div className="search-bar-container">
        <input
          type="text"
          className="search-input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="search-input"
          placeholder="Middle Name"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
        />
        <input
          type="text"
          className="search-input"
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <label className='burialSearch-datesLabel'>Date of Birth</label>
        <input
          type="date"
          className="search-input"
          placeholder="Date of Birth"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <label className='burialSearch-datesLabel'>Date of Death</label>
        <input
          type="date"
          className="search-input"
          placeholder="Date of Death"
          value={dateOfDeath}
          onChange={(e) => setDateOfDeath(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>

      <ResultModal
        isOpen={isResultModalOpen}
        onClose={handleCloseResultModal}
        searchResults={searchResults}
        openMap={handleOpenMap}
      />
      <ContactComponent/>
    </div>
  );
}
