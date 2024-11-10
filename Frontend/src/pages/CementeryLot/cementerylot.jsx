import {useEffect,useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Polygon, Marker, DirectionsRenderer  } from '@react-google-maps/api';
import {useLocationContext} from '../../Context/SceneIDcontext.jsx';
import {GeolocationContext} from '../../Context/geolocationContext.jsx';
import markerSvg from '../../assets/personLoc.svg';
import plotpos from '../../assets/position.svg'
import {polygonCoords1, polygonCoords2, polygonCoords3, polygonCoords4, polygonCoords5, center }  from '../../utils/mapgridCoords.js'
import './cemeteryLot.css';
import { FiDelete , FiTarget, FiMapPin, FiDisc } from "react-icons/fi";

const options = {
  disableDefaultUI: true,  // Disable default UI controls
  mapTypeControl: false,   // Hide map type controls
  mapTypeId: "satellite",  // Satellite view
  gestureHandling: "greedy"
};

export default function Cementerylot (){
  const {locationContext, setScene} = useLocationContext();
  const {location, startWatchingLocation, getCurrentLocation } = GeolocationContext();
  const [directions, setDirections] = useState(null);
  const [map, setMap] = useState(null);
  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['geometry', 'places', 'directions'],
  });

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

  async function startDirection() {
    try {
      const currentLocation = await getCurrentLocation(); // Get user's current location
  
      // Clear the previous directions before setting new ones
      setDirections(null);
  
      const directionsService = new window.google.maps.DirectionsService();
      console.log("directionService: ", directionsService);
      directionsService.route(
        {
          origin: new window.google.maps.LatLng(currentLocation.latitude, currentLocation.longitude),
          destination: "Himlayang Lahing Kayumanggi",
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result); // Set the directions result to render it
            console.log("result: ", result);
          } else {
            console.error("Error fetching directions", result);
          }
        }
      );
    } catch (error) {
      console.error("Error getting location or fetching directions:", error);
    }
  }
  
  useEffect(()=>{
    startWatchingLocation();
  },[])
  
  // Add this function in the component to update directions on location change
  // useEffect(() => {
  //   if (location) {
  //     startDirection();
  //   }
  // }, [location]); // Depend on location updates

  const onLoad = useCallback((mapInstance) => {
    createGridCells(mapInstance, polygonCoords1, -25, 0.0000258,0.00001); // Grid for first area
    createGridCells(mapInstance, polygonCoords2, -8, 0.0000258,0.00001); // Grid for second area
    createGridCells(mapInstance, polygonCoords3, -25.3, 0.0000258,0.00001); 
    createGridCells(mapInstance, polygonCoords4, -27.5, 0.000039,0.00007); 
    createGridCells(mapInstance, polygonCoords5, -23, 0.000035, 0.00005);
    
    setMap(mapInstance);
    
  }, [createGridCells]);
  
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const customMarkerIcon = {
    url: markerSvg, 
    scaledSize: new window.google.maps.Size(25, 25),
  };

  const plotPositon = {
    url: plotpos, 
    scaledSize: new window.google.maps.Size(40, 40),
  };

  return(
    <div className="cemeteryLotMap-container">
    <div style={{ height: '100%', width: '100%'}} className='cemeteryLotMap-container'>
      <GoogleMap
        zoom={24} // Adjusted zoom to better see the shapes
        center={center}
        mapContainerStyle={{ height: '100%', width: '100%' }}
        options={options}
        onLoad={onLoad}
      >
        {/* {locationContext && <Polygon path={locationContext} options={polygonOptions} />} */}
        <Marker
          position={locationContext}
          icon={plotPositon}
        />
        {location && <Marker
          position={{ lat: location.latitude, lng: location.longitude }}
          icon={customMarkerIcon}
        />}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
    
      <button onClick ={() => {
        map.panTo(center);
        map.setZoom(20);
      }} className="center-btn"><FiTarget style={{height:'100%', width:'100%' }}/></button>
      <button onClick={()=> startDirection()} className="direction-btn"><FiMapPin style={{height:'60%', width:'60%'}} /></button>
      <button onClick={()=> setScene(false)} className="cemeteryLot-back-btn"><FiDelete  style={{height:'60%', width:'60%'}}/></button>
      <button onClick={()=> {
        map.panTo({ lat: location.latitude, lng: location.longitude });
        map.setZoom(20);
      }} className="focus-direction-btn"><FiDisc style={{height:'100%', width:'100%'}}/></button>
    </div>
  );
};