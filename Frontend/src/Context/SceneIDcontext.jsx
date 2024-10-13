import React, { createContext, useState, useContext } from 'react';

const LocationContext = createContext();

export function LocationContextPRovider({ children }) {
  const [locationContext, setLocationCon] = useState(null);

  const handleLatlngObjConvertion = (array) => {
    const latLngObjects = array.map(coordinate => {
        const [lat, lng] = coordinate.split(',').map(Number); 
        return { lat, lng };  
    });
    
    console.log("Converted lat/lng objects: ", latLngObjects);
    setLocationCon(latLngObjects);
}


  return (
    <LocationContext.Provider value={{ locationContext, setLocationCon, handleLatlngObjConvertion }}>
      {children}
    </LocationContext.Provider>
  );
}

export const useLocationContext = () => {
  return useContext(LocationContext);
};
