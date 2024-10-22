import { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Polygon } from '@react-google-maps/api';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

const center = { lat: 14.88886531493886, lng: 120.77947973952769 };

const mapBounds = {
  north: center.lat + 0.0018,
  south: center.lat - 0.001,
  east: center.lng + 0.0018,
  west: center.lng - 0.0018,
};

const polygonOptions = {
  strokeColor: '#00FF00',
  strokeOpacity: 0.8,
  strokeWeight: 1.5,
  fillOpacity: 0.1,
};

const options = {
  mapId: '31df144c8f9b66d4',
  disableDefaultUI: true,
  mapTypeControl: false,
  mapTypeId: "satellite",
  restriction: {
    latLngBounds: mapBounds,
    strictBounds: true,
  }
};

const VacantLot = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const { data: vacantLots, isLoading, error, refetch } = useQuery({
    queryKey: ['vacantLots'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:9220/api/vacantlots');
      return response.data.data;
    },
    refetchOnMount: true,  // Fetch fresh data on every mount
    refetchOnWindowFocus: false,
  });

  const [polygonData, setPolygonData] = useState([]);

  useEffect(() => {
    // Only update polygonData when both map is loaded and lots data is available
    if (isLoaded && vacantLots) {
      const parsedLots = vacantLots.map((lot) => ({
        id: lot.id,
        path: [
          parseLatLng(lot.lat_lng_point_one),
          parseLatLng(lot.lat_lng_point_two),
          parseLatLng(lot.lat_lng_point_three),
          parseLatLng(lot.lat_lng_point_four),
        ],
      }));
      setPolygonData(parsedLots);
    }
  }, [isLoaded, vacantLots]);

  const parseLatLng = (point) => {
    const [lat, lng] = point.split(',').map(Number);
    return { lat, lng };
  };

  if (!isLoaded || isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching vacant lots: {error.message}</div>;
  }

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <GoogleMap
        zoom={24}
        center={center}
        mapContainerStyle={{ height: '100%', width: '100%' }}
        options={options}
      >
        {polygonData.map((lot) => (
          <Polygon key={lot.id} path={lot.path} options={polygonOptions} />
        ))}
      </GoogleMap>
    </div>
  );
};

export default VacantLot;
