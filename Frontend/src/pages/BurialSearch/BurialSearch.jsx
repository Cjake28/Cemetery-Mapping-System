import './BurialSearch.css';
import { SearchBar } from '../../components/searchBarfolder/searchBar.jsx';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useSceneIdContext} from '../../Context/SceneIDcontext.jsx';

export default function BurialSearch() {
    const { data, isLoading, error } = useQuery({
    queryKey: ['persons'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:9220/api/get-all-person');
      console.log("tae");
      return response.data.data; // Assuming the data is under `data`
    }
  });

  const navigate = useNavigate();

  const { sceneID, setSceneID} = useSceneIdContext();
  
  // State for the search query
  const [searchQuery, setSearchQuery] = useState('');

  // Filter data based on the search query
  const filteredPersons = data?.filter((person) =>
    person.fullname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePersonClick = (person) => {
    setSceneID(person);
    console.log("Scene ID set to: ", person.id);
    navigate("/VirtualTour");
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="Burial_Search_Container">
      <div className='Search-Bar-container'>
        {/* Pass the search query state and the setter function to SearchBar */}
        <SearchBar setSearchQuery={setSearchQuery} className='Search-Bar-component' />
        <ul id="search-person-container" >
            {
                searchQuery.length > 0 &&
                filteredPersons?.map((person) => (
                <li className="person-list-container" key={person.id} onClick={() => handlePersonClick(person)}>
                {person.fullname} - {person.location}
                </li>
                ))
          }
        </ul>
      </div>
    </div>
  );
}
