import {useEffect,useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Polygon, Marker, Rectangle } from '@react-google-maps/api';
import {useLocationContext} from '../../Context/SceneIDcontext.jsx';
import {GeolocationContext} from '../../Context/geolocationContext.jsx';
import markerSvg from '../../assets/uncle-svgrepo-com.svg';
import {polygonCoords1, polygonCoords2, polygonCoords3, polygonCoords4, polygonCoords5 }  from '../../utils/mapgridCoords.js'
// import './cemeteryLot.css';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

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

const options = {
  mapId:'31df144c8f9b66d4',
  disableDefaultUI: true,  // Disable default UI controls
  mapTypeControl: false,   // Hide map type controls
  mapTypeId: "satellite",  // Satellite view
  restriction: {
    latLngBounds: mapBounds,
    strictBounds: true // Enforce the restriction
  }
};

const Cementerylot = () => {
  const {locationContext} = useLocationContext();
  const {location, startWatchingLocation, getCurrentLocation } = GeolocationContext();
  const [insideCemetery, setInsideCemetery] = useState(false);
  console.log("location context: " + locationContext);
  
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

  const createGridCells = useCallback((map, polygonCoords, RDeg, gridWidth, gridHeight) => {
    const rotationAngle = (RDeg * Math.PI) / 180;

    const bounds = new window.google.maps.LatLngBounds();
    polygonCoords.forEach((coord) => bounds.extend(coord));

    const rotatePoint = (lat, lng) => {
      const x = lat - center.lat;
      const y = lng - center.lng;
      const rotatedX = x * Math.cos(rotationAngle) - y * Math.sin(rotationAngle);
      const rotatedY = x * Math.sin(rotationAngle) + y * Math.cos(rotationAngle);
      return {
        lat: rotatedX + center.lat,
        lng: rotatedY + center.lng,
      };
    };

    for (let lat = bounds.getSouthWest().lat(); lat <= bounds.getNorthEast().lat(); lat += gridHeight) {
      for (let lng = bounds.getSouthWest().lng(); lng <= bounds.getNorthEast().lng(); lng += gridWidth) {

        const topLeft = rotatePoint(lat, lng);
        const topRight = rotatePoint(lat, lng + gridWidth);
        const bottomRight = rotatePoint(lat + gridHeight, lng + gridWidth);
        const bottomLeft = rotatePoint(lat + gridHeight, lng);

        const cellCoords = [topLeft, topRight, bottomRight, bottomLeft];

        const cellCenter = new window.google.maps.LatLng(
          (topLeft.lat + bottomRight.lat) / 2,
          (topLeft.lng + bottomRight.lng) / 2
        );

        // Check if the cell center is within the polygon and if it matches the target point
        const isTargetCell = locationContext
          ? Math.abs(cellCenter.lat() - locationContext.lat) < gridHeight / 2 &&
            Math.abs(cellCenter.lng() - locationContext.lng) < gridWidth / 2
          : null;

        if(isTargetCell){
          console.log("isTargetCell: ", locationContext);
        }

        if (
          window.google.maps.geometry.poly.containsLocation(
            cellCenter,
            new window.google.maps.Polygon({ paths: polygonCoords })
          )
        ) {
          new window.google.maps.Polygon( isTargetCell ? {
            paths: cellCoords,
            strokeColor: '#00FF00',
            strokeOpacity: 0.7,
            strokeWeight: 1,
            fillColor: '#00FF00',
            fillOpacity: 0.8,
            map: map,
          }:
          {
            paths: cellCoords,
            strokeColor: '#FFFFFF',
            strokeOpacity: 0.5,
            strokeWeight: 0.8,
            // fillColor: '#FF0000',
            // fillOpacity: 0.4,
            map: map,
          }
        );
        }
      }
    }
  }, []);

  const onLoad = useCallback((map) => {
    createGridCells(map, polygonCoords1, -25, 0.0000258,0.00001); // Grid for first area
    createGridCells(map, polygonCoords2, -8, 0.0000258,0.00001); // Grid for second area
    createGridCells(map, polygonCoords3, -25.3, 0.0000258,0.00001); 
    createGridCells(map, polygonCoords4, -27.5, 0.000039,0.00007); 
    createGridCells(map, polygonCoords5, -23, 0.000035, 0.00005); 

  }, [createGridCells]);
  
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

    const customMarkerIcon = {
    url: markerSvg, 
    scaledSize: new window.google.maps.Size(25, 25),
  };

  return(
    <>
    <div style={{ height: '100vh', width: '100vw'}} className='cemeteryLotMap-container'>
      <GoogleMap
        zoom={24} // Adjusted zoom to better see the shapes
        center={center}
        mapContainerStyle={{ height: '100%', width: '100%' }}
        options={options}
        onLoad={onLoad}
      >
        {/* Polygon Component */}
        {/* {locationContext && <Polygon path={locationContext} options={polygonOptions} />} */}

        {/* <Polygon path={polygonPath} options={polygonOptions}/> */}
        
        {insideCemetery && location && <Marker
          position={{ lat: location.latitude, lng: location.longitude }}
          icon={customMarkerIcon}
        />}
      </GoogleMap>
    </div>
    </>
  );
};

export default Cementerylot;
