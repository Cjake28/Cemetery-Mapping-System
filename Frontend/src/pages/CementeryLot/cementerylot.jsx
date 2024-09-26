import React from 'react';
import { GoogleMap, useJsApiLoader, Polygon } from '@react-google-maps/api';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

// Set to your desired center coordinates
const center = {
  lat: 14.888521, 
  lng: 120.779501
};

// Define polygon coordinates
const polygonPath = [
  { lat: 14.888419, lng: 120.779195 },
  { lat: 14.888506, lng: 120.779484 },
  { lat: 14.888511, lng: 120.779491 },
  { lat: 14.888521, lng: 120.779501 },
  { lat: 14.888558, lng: 120.779509 },
  { lat: 14.888750, lng: 120.779469 },
  { lat: 14.888907, lng: 120.779440 },
  { lat: 14.889165, lng: 120.779383 },
  { lat: 14.889235, lng: 120.779327},
  { lat: 14.889100, lng: 120.779037 },
  { lat: 14.888964, lng: 120.779094 },
  { lat: 14.888490, lng: 120.779125 },
  // 14.889235, 120.779327


];

// Define polygon options
const polygonOptions = {
  strokeColor: "#00FF00",
  strokeOpacity: 0.8,
  strokeWeight: 3,
  fillOpacity: 0,
};


const options = {
  disableDefaultUI: true,
  mapTypeControl: false, 
  mapTypeId:"satellite" 
};

const Cementerylot = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <GoogleMap 
        zoom={40} 
        center={center} 
        mapContainerStyle={{ height: '100%', width: '100%' }}
         // Apply the options with mapTypeControl
         // Set the map type to satellite
        options={options} 
      >
        {/* Polygon Component */}
        <Polygon
          path={polygonPath}
          options={polygonOptions}
        />
      </GoogleMap>
    </div>
  );
};

export default Cementerylot;
