import './BurialSearch.css';
import { SearchBar } from '../../components/searchBarfolder/searchBar.jsx';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocationContext } from '../../Context/SceneIDcontext.jsx';
import { GeolocationContext } from '../../Context/geolocationContext.jsx';
import PrivacyModal from './modal/PrivacyModal.jsx';

// Image URL or import directly
import ExampleImage from '../../assets/himlayanSearchText.png';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function BurialSearch() {
  const { requestLocationPermission } = GeolocationContext();
  const { handleLatlngObjConvertion } = useLocationContext();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

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

  const navigate = useNavigate();

  const filteredPersons = persons?.filter((person) =>
    person?.fullname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePersonClick = (person) => {
    if (!person.center_lat_lng) {
      console.error("Missing lat/lng data for person:", person);
      return;
    }

    handleLatlngObjConvertion(person?.center_lat_lng);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="Burial_Search_Container">
      {isModalOpen && <PrivacyModal onClose={() => setIsModalOpen(false)} />}

      {/* Adding the image here */}
      <div className="image-container">
        <img src={ExampleImage} alt="Descriptive Text" className="example-image" />
      </div>

      <div className='Search-Bar-container'>
        <SearchBar setSearchQuery={setSearchQuery} className='Search-Bar-component'/>
        <ul id="search-person-container">
          {searchQuery.length > 0 &&
            filteredPersons?.map((person) => (
              <li
                className="person-list-container"
                key={person.id}
                onClick={() => handlePersonClick(person)}
              >
                {person.fullname} - {person.location}
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}
