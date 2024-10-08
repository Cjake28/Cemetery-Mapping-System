import './manageGravesite.css'
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import axios from 'axios';
import PersonsTable from './modal/personsTable.jsx';

export default function ManageGraveSite(){
    const { data: persons, isLoading, error } = useQuery({
        queryKey: ['persons'],
        queryFn: async () => {
          const response = await axios.get('http://localhost:9220/api/get-all-person');
          console.log("console data: ",response.data);
          return response.data.persons; // Assuming the data is under `data`
        }
      });

      useEffect(()=>{
        console.log(persons);
      }, [persons])

    return(
        <div id="manageGravesite-container">
            <div className="manageuser-top">
                <div className="create-person">
                    <button 
                        className="create-person-btn" 
                        // onClick={() => setIsModalOpen(true)} // Open modal on button click
                    >
                        Create New Person
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
            <PersonsTable persons={persons}/>
        </div>
    )
}