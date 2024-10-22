import './BurialSearch.css';
import { SearchBar } from '../../components/searchBarfolder/searchBar.jsx';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useLocationContext} from '../../Context/SceneIDcontext.jsx';
import {GeolocationContext} from '../../Context/geolocationContext.jsx';

export default function BurialSearch() {
  const {requestLocationPermission} = GeolocationContext();

  useEffect(() => {
    // Request location permission as soon as the page loads
    requestLocationPermission();
  }, []);
  
    const { data: persons, isLoading, error } = useQuery({
    queryKey: ['persons'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:9220/api/get-all-person');
      console.log("tae");
      return response.data.persons; // Assuming the data is under `data`
    }
  });

  const navigate = useNavigate();

  const {handleLatlngObjConvertion} = useLocationContext();
  
  // State for the search query
  const [searchQuery, setSearchQuery] = useState('');

  // Filter data based on the search query
  const filteredPersons = persons?.filter((person) =>
    person?.fullname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePersonClick =(person) =>{
    //todo right now the scene is set to all of person data need to update to specific data later
    // setSceneID(person);
    // console.log("Scene ID set to: ", person.id);
    // console.log(typeof(person?.lat_lng_point_one));
    handleLatlngObjConvertion([
      person?.lat_lng_point_one, 
      person?.lat_lng_point_two, 
      person?.lat_lng_point_three, 
      person?.lat_lng_point_four
  ]);
    navigate("cementerylot");
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="Burial_Search_Container">
      <div className='Search-Bar-container'>
        {/* Pass the search query state and the setter function to SearchBar */}
        <SearchBar setSearchQuery={setSearchQuery} className='Search-Bar-component'/>
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
