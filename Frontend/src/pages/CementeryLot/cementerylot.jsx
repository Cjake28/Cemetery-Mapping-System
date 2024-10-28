import {useEffect,useState} from 'react';
import { GoogleMap, useJsApiLoader, Polygon, Marker, Rectangle } from '@react-google-maps/api';
import {useLocationContext} from '../../Context/SceneIDcontext.jsx';
import {GeolocationContext} from '../../Context/geolocationContext.jsx';
import markerSvg from '../../assets/uncle-svgrepo-com.svg';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

// Set to your desired center coordinates
const center = {
  lat: 14.888821,
  lng: 120.779467,
};

const mapBounds = {
  north: center.lat + 0.0018,  // A bit north of the center
  south: center.lat - 0.001,  // A bit south of the center
  east: center.lng + 0.0018,   // A bit east of the center
  west: center.lng - 0.0018    // A bit west of the center
};

const currentPosition = {
  lat: 14.888821,
  lng: 120.779467,
}

// Define polygon coordinates
const polygonPath = [
  //for testing
  // { lat: 14.904080524364822, lng: 120.788730885781 },
  // { lat: 14.904033633321532, lng: 120.78930734470765 },
  // { lat: 14.90356284667923, lng: 120.78913654206295 },
  // { lat: 14.90375603813445, lng: 120.78858919722349 },

  // for prduction
  { lat: 14.8888116371095, lng: 120.77787947308613 },
  { lat: 14.890034439165516, lng: 120.78035776034305 },
  { lat: 14.88959357246283, lng: 120.78062391085757 },
  { lat: 14.888521304435601, lng: 120.78041934311165 },
  { lat: 14.887797921005744, lng: 120.77949338482969 },
  { lat: 14.888037909958108, lng: 120.77858975718522 },

];

const point = {
  lat:14.888656062925538, 
  lng: 120.77965846330041
}

// const polygonPaths = [
//   {lat: 14.888947, lng:120.779360},
//   {lat:14.888919, lng:120.779374 },
//   {lat:14.888931, lng:120.779395},
//   {lat:14.888954, lng:120.779382},
// ]

// Define polygon options
const polygonOptions = {
  strokeColor: '#00FF00',
  strokeOpacity: 0.8,
  strokeWeight: 1.5,
  fillOpacity: 0.5,
};

const options = {
  mapId:'31df144c8f9b66d4',
  disableDefaultUI: true,  // Disable default UI controls
  mapTypeControl: false,   // Hide map type controls
  mapTypeId: "satellite",  // Satellite view
  restriction: {
    latLngBounds: mapBounds,
    strictBounds: true, // Enforce the restriction
  }
};

const Cementerylot = () => {
  const {locationContext} = useLocationContext();
  const {location, startWatchingLocation, getCurrentLocation } = GeolocationContext();
  const [insideCemetery, setInsideCemetery] = useState(false);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['geometry']
  });

  useEffect(() => {
    if (window.google && window.google.maps.geometry) {
      getCurrentLocation()
        .then(({ latitude, longitude }) => {
          const polygon = new window.google.maps.Polygon({ paths: polygonPath });
          const currentLocation = new window.google.maps.LatLng(latitude, longitude);
  
          const inside = window.google.maps.geometry.poly.containsLocation(currentLocation, polygon);
          if (inside) {
            startWatchingLocation(); // Now starts watching without affecting state
            setInsideCemetery(true);
          }
        })
        .catch((error) => {
          console.error('Error getting location:', error);
          setInsideCemetery(false);
        });
    }
  }, [isLoaded]);

  
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

    const customMarkerIcon = {
    url: markerSvg, 
    scaledSize: new window.google.maps.Size(25, 25),
  };

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <GoogleMap
        zoom={24} // Adjusted zoom to better see the shapes
        center={center}
        mapContainerStyle={{ height: '100%', width: '100%' }}
        options={options}
      >
        {/* Polygon Component */}
        {locationContext && <Polygon path={locationContext} options={polygonOptions} />}

        <Polygon path={polygonPath} options={polygonOptions}/>
        
        {insideCemetery && location && <Marker
          position={{ lat: location.latitude, lng: location.longitude }}
          icon={customMarkerIcon}
        />}
      </GoogleMap>
    </div>
  );
};

export default Cementerylot;
