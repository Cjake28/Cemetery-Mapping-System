import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import markerSvg from '../../assets/uncle-svgrepo-com.svg';
import ErrorModal from './errorModal.jsx';  // Import your modal component

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

const center = {
  lat: 14.888821,
  lng: 120.779467,
};

const options = {
  mapId: '31df144c8f9b66d4',
  disableDefaultUI: true,
  mapTypeId: 'satellite',
};

const VacantLot = () => {
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    let watchId;

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition({ latitude, longitude });
          setError(null); // Clear error if position is successfully retrieved
        },
        (error) => {
          setError(error.message);
          setShowModal(true); // Show modal when there's an error
        },
        {
          enableHighAccuracy: true,
          maximumAge: 10000,
          timeout: 5000,
        }
      );
    } else {
      setError('Geolocation is not supported by this browser');
      setShowModal(true); // Show modal if geolocation is not supported
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  const customMarkerIcon = isLoaded && {
    url: markerSvg,
    scaledSize: new window.google.maps.Size(25, 25),
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <GoogleMap
        zoom={24}
        center={center}
        mapContainerStyle={containerStyle}
        options={options}
      >
        {/* Conditionally render the marker only if there's no error */}
        {!error && position.latitude && position.longitude && (
          <Marker
            position={{ lat: position.latitude, lng: position.longitude }}
            icon={customMarkerIcon}
          />
        )}
      </GoogleMap>

      {/* Show the modal if there is an error */}
      {showModal && (
        <ErrorModal onClose={() => setShowModal(false)}>
          <p>Error: {error}</p>
        </ErrorModal>
      )}
    </div>
  );
};

export default VacantLot;
