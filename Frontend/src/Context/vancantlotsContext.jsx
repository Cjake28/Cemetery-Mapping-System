import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';

// Create VacantLots context
const VacantLotsContext = createContext();

const API_URL = import.meta.env.VITE_BACKEND_URL;  

export const VacantLotsProvider = ({ children }) => {
  const [vacantLots, setVacantLots] = useState([]);
  const [polygonData, setPolygonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVacantLots = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_URL}/api/vacantlots`);
      setVacantLots(response.data.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVacantLots();
  }, [fetchVacantLots]);

  useEffect(() => {
    if (vacantLots.length > 0) {
      const parsedLots = vacantLots.map((lot) => ({
        id: lot.id,
        coords: parseLatLng(lot.lat_lng_point_center),
      }));
      setPolygonData(parsedLots);
    }
  }, [vacantLots]);

  const parseLatLng = (point) => {
    const [lat, lng] = point.split(',').map(Number);
    return { lat, lng };
  };

  return (
    <VacantLotsContext.Provider value={{ vacantLots, polygonData, isLoading, error, refetch: fetchVacantLots }}>
      {children}
    </VacantLotsContext.Provider>
  );
};

// Custom hook to use the VacantLots context
export const useVacantLots = () => {
  return useContext(VacantLotsContext);
};
