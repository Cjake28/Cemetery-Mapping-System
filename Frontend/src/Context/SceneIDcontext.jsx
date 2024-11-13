import React, { createContext, useState, useContext } from 'react';

const LocationContext = createContext();

export function LocationContextPRovider({ children }) {
  const [scene, setScene] = useState(false);
  const [locationContext, setLocationCon] = useState(null);
  const [person_name_loc, setPerson_name_loc] = useState(null);

  const handleLatlngObjConvertion = (coordinate) => {
    // Split the coordinate and map it to lat/lng
  const [lat, lng] = coordinate.split(',').map(Number); 
  const latLngObject = { lat, lng };
    
  console.log("Converted lat/lng object: ", latLngObject);

  // Update the context with the new lat/lng object
  setLocationCon(latLngObject);
}

  return (
    <LocationContext.Provider value={{ person_name_loc, setPerson_name_loc, scene, setScene, locationContext, setLocationCon, handleLatlngObjConvertion }}>
      {children}
    </LocationContext.Provider>
  );
}

export const useLocationContext = () => {
  return useContext(LocationContext);
};
