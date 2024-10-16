import {useEffect,useState} from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { GoogleMap, useJsApiLoader, Polygon, Marker, Rectangle } from '@react-google-maps/api';
import {useLocationContext} from '../../Context/SceneIDcontext.jsx';
import {GeolocationContext} from '../../Context/geolocationContext.jsx'
import markerSvg from '../../assets/uncle-svgrepo-com.svg'
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
  { lat: 14.888419, lng: 120.779195 },
  { lat: 14.888506, lng: 120.779484 },
  { lat: 14.888511, lng: 120.779491 },
  { lat: 14.888521, lng: 120.779501 },
  { lat: 14.888558, lng: 120.779509 },
  { lat: 14.888750, lng: 120.779469 },
  { lat: 14.888907, lng: 120.779440 },
  { lat: 14.889165, lng: 120.779383 },
  { lat: 14.889235, lng: 120.779327 },
  { lat: 14.889100, lng: 120.779037 },
  { lat: 14.888964, lng: 120.779094 },
  { lat: 14.888490, lng: 120.779125 },
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
  fillOpacity: 0,
};


// Define rectangle bounds
// const rectangleBounds = {
//   north: 14.888954,
//   south: 14.888919,
//   east: 120.779395,
//   west: 120.779360,
// };

// Define rectangle options
// const rectangleOptions = {
//   strokeColor: '#FF0000',
//   strokeOpacity: 0.1,
//   strokeWeight: 1,
//   fillColor: '#FF0000',
//   fillOpacity: 0.15,
// };

const options = {
  mapId:'31df144c8f9b66d4',
  disableDefaultUI: true,  // Disable default UI controls
  mapTypeControl: false,   // Hide map type controls
  mapTypeId: "satellite",  // Satellite view
  // restriction: {
  //   latLngBounds: mapBounds,
  //   strictBounds: true, // Enforce the restriction
  // }
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
    url: markerSvg, // This is the imported SVG file
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
        {/* Rectangle Component */}
        {/* <Rectangle bounds={rectangleBounds} options={rectangleOptions} /> */}
      </GoogleMap>
    </div>
  );
};

export default Cementerylot;
