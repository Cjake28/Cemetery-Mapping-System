// geolocationContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

const geolocationcontext = createContext();

export const GeolocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isWatching, setIsWatching] = useState(false);

  // Function to request permission and initial location
  const requestLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          setError(error.message);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 10000,
          timeout: 5000,
        }
      );
    } else {
      setError('Geolocation is not supported by this browser');
    }
  };

  // Function to start continuous location tracking
  const startWatchingLocation = () => {
    if (navigator.geolocation && !isWatching) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          setError(error.message);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 10000,
          timeout: 5000,
        }
      );
      setIsWatching(true);

      // Stop watching when the component unmounts or user leaves the page
      return () => navigator.geolocation.clearWatch(watchId);
    }
  };

  return (
    <geolocationcontext.Provider
      value={{ location, error, requestLocationPermission, startWatchingLocation }}
    >
      {children}
    </geolocationcontext.Provider>
  );
};


export const GeolocationContext = () => {
    return useContext(geolocationcontext);
};


