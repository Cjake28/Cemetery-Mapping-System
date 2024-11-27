import { useState, useEffect, useCallback, useRef} from 'react';
import { GoogleMap, useJsApiLoader, DirectionsRenderer, Marker } from '@react-google-maps/api';
import { useVacantLots } from '../../Context/vancantlotsContext.jsx'
import {GeolocationContext} from '../../Context/geolocationContext.jsx';
import markerSvg from '../../assets/personLoc.svg';
import plotpos from '../../assets/position.svg'
import centerLoc from '../../assets/centerLocation.svg';
import userLoc from '../../assets/userLocation.svg'
import { FiDelete , FiTarget, FiMapPin, FiDisc } from "react-icons/fi";
import ShowRouteModal from './showRouteModal.jsx';  // Import the modal
import {polygonCoords1, 
        polygonCoords2, 
        polygonCoords3, 
        polygonCoords4, 
        polygonCoords5,
        polygonCoords6,
        polygonCoords7,
        polygonCoords8,
        polygonCoords9,
        polygonCoords10,
        polygonCoords11,
        polygonCoords12,
        polygonCoords13,
        center 
      }  from '../../utils/mapgridCoords.js'

const options = {
  disableDefaultUI: true,
  mapTypeControl: false,
  mapTypeId: "satellite",
  gestureHandling: "greedy"
};
const googleMap_libraries =  ["geometry", "places", "directions"]

export default function VacantLot(){
  const {polygonData, error} = useVacantLots();
  const {location, startWatchingLocation, getCurrentLocation } = GeolocationContext();
  const [directions, setDirections] = useState(null);
  const [map, setMap] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [targetLocation, setTargetLocation] = useState(null);
  const solidLineRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: googleMap_libraries,
  });

  const createGridCells = useCallback((map, polygonCoords, RDeg, gridWidth, gridHeight, grCenter) => {
    const rotationAngle = (RDeg * Math.PI) / 180;

    const bounds = new window.google.maps.LatLngBounds();
    polygonCoords.forEach((coord) => bounds.extend(coord));
  
    const roundCoordinate = (coordinate, decimals = 6) => {
      return Math.round(coordinate * Math.pow(10, decimals)) / Math.pow(10, decimals);
    };
  
    const rotatePoint = (lat, lng) => {
      const x = lat - grCenter.lat;
      const y = lng - grCenter.lng;
      const rotatedX = x * Math.cos(rotationAngle) - y * Math.sin(rotationAngle);
      const rotatedY = x * Math.sin(rotationAngle) + y * Math.cos(rotationAngle);
      return {
        lat: rotatedX + grCenter.lat,
        lng: rotatedY + grCenter.lng,
      };
    };
  
    for (let lat = bounds.getSouthWest().lat(); lat <= bounds.getNorthEast().lat(); lat += gridHeight) {
      for (let lng = bounds.getSouthWest().lng(); lng <= bounds.getNorthEast().lng(); lng += gridWidth) {
  
        const cellCoords = [
          rotatePoint(lat, lng),
          rotatePoint(lat, lng + gridWidth),
          rotatePoint(lat + gridHeight, lng + gridWidth),
          rotatePoint(lat + gridHeight, lng),
        ];
  
        const cellCenter = new window.google.maps.LatLng(
          roundCoordinate((cellCoords[0].lat + cellCoords[2].lat) / 2),
          roundCoordinate((cellCoords[0].lng + cellCoords[2].lng) / 2)
        );
  
        // Check if the cell center is within the polygon and if it matches the target point
        const isInsidePolygon = window.google.maps.geometry.poly.containsLocation(
          cellCenter,
          new window.google.maps.Polygon({ paths: polygonCoords })
        );
  
        if (isInsidePolygon) {
          const isTargetCell = polygonData.some(target =>
            Math.abs(cellCenter.lat() - target?.coords?.lat) < gridHeight / 2 &&
            Math.abs(cellCenter.lng() - target?.coords?.lng) < gridWidth / 2
          );
  
          // Create grid cell polygons with conditional styling
          const polygon = new window.google.maps.Polygon({
            paths: cellCoords,
            strokeColor: isTargetCell ? '#0000FF' : '#FFFF00',
            strokeOpacity: isTargetCell ? 0.7 : 0.5,
            strokeWeight: isTargetCell ? 1 : 0.8,
            fillColor: isTargetCell ? '#0000FF' : undefined,
            fillOpacity: isTargetCell ? 0.8 : 0,
            map: map,
          });
  
          // Add click event only if isTargetCell is true
          if (isTargetCell) {
            polygon.addListener('click', () => {
              setTargetLocation({lat: cellCenter.lat(), lng: cellCenter.lng()});
              setShowModal(true); // Show modal on cell click
            });
          }
        }
      }
    }
  }, [polygonData]);

  async function startDirection(loc){
    try {
      const currentLocation = await getCurrentLocation(); // Get user's current location
      
      // Clear the previous directions before setting new ones
      setDirections(null);
  
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: new window.google.maps.LatLng(currentLocation.latitude, currentLocation.longitude),
          destination: loc || "Himlayang Lahing Kayumanggi",
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result); // Set the directions result to render it
            
            // Get the last latitude and longitude from the route
            const lastLeg = result.routes[0].legs[result.routes[0].legs.length - 1];
            const lastLatLng = lastLeg.end_location;
            
            // Create a solid line from the last location to locationContext
            if (solidLineRef.current) {
              solidLineRef.current.setMap(null);
              solidLineRef.current = null;
            }

            // Create a new solid line from the last location to the target location
            const solidLine = new window.google.maps.Polyline({
              path: [
                { lat: lastLatLng.lat(), lng: lastLatLng.lng() },
                loc,
              ],
              strokeColor: "#4285F4", // Google blue color
              strokeOpacity: 1, // Fully opaque
              strokeWeight: 4, // Thickness of the line
              map: map, // Attach to the map instance
            });

            // Store the reference of the new solid line
            solidLineRef.current = solidLine;
            
            console.log("Solid line drawn from last point to locationContext.");
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
  
  const onLoad = useCallback((mapInstance) => {
    createGridCells(mapInstance, polygonCoords1, -25, 0.0000258,0.00001, center); // Grid for first area
    createGridCells(mapInstance, polygonCoords2, -27, 0.0000258,0.00001, {lat:14.888463243850705, lng: 120.7796897391385}); // Grid for second area
    createGridCells(mapInstance, polygonCoords3, -25.3, 0.0000258,0.00001, center);
    createGridCells(mapInstance, polygonCoords4, -27.5, 0.000039,0.00007, center);
    createGridCells(mapInstance, polygonCoords5, -25, 0.000035, 0.00005, {lat:14.889092682267146, lng: 120.77996924487826});
    createGridCells(mapInstance, polygonCoords6, -28, 0.00002,0.00005, {lat:14.88965032489237, lng: 120.78015063987819});
    createGridCells(mapInstance, polygonCoords7, -28, 0.00003,0.000065, {lat:14.889597502861827, lng: 120.78019569116832});
    createGridCells(mapInstance, polygonCoords8, -28, 0.00003 ,0.000072, {lat:14.889492002990655, lng: 120.78016942582872});
    createGridCells(mapInstance, polygonCoords9, -28, 0.00003 ,0.00003, {lat:14.889363361634262, lng: 120.7802421405942});
    createGridCells(mapInstance, polygonCoords10, -28, 0.00003 ,0.000028, {lat:14.889295171070868, lng: 120.7802410014054});
    createGridCells(mapInstance, polygonCoords11, -25, 0.00001,0.0000228, {lat:14.889236891676887, lng: 120.78029130432026});
    createGridCells(mapInstance, polygonCoords12, -28, 0.00003,0.000072, {lat:14.889609273030171, lng: 120.78035698519585});
    createGridCells(mapInstance, polygonCoords13, -25, 0.000015,0.0000348, {lat:14.88955837003466, lng: 120.78039142723911});

    setMap(mapInstance);
    
  }, [createGridCells]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching vacant lots: {error.message}</div>;
  }

  const customMarkerIcon = {
    url: markerSvg, 
    scaledSize: new window.google.maps.Size(30, 30),
  };

  const plotPositon = {
    url: plotpos, 
    scaledSize: new window.google.maps.Size(40, 40),
  };

  return (
    <div className="cemeteryLotMap-container">
    <div style={{ height: '100%', width: '100%'}} className='cemeteryLotMap-container'>
      <GoogleMap
        zoom={24} // Adjusted zoom to better see the shapes
        center={center}
        mapContainerStyle={{ height: '100%', width: '100%' }}
        options={options}
        onLoad={onLoad}
      >
        
        {location && <Marker
          position={{ lat: location.latitude, lng: location.longitude }}
          icon={customMarkerIcon}
        />}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>

    <ShowRouteModal 
        show={showModal} 
        onClose={() => setShowModal(false)} 
        onConfirm={() => { startDirection(targetLocation);
          setShowModal(false); 
        }} 
      />
    
      <button onClick ={() => {
        map.panTo(center);
        map.setZoom(20);
      }} className="center-btn"><img 
        src={centerLoc} 
        alt="center Location Icon" 
        style={{ width: '50%', height: '50%' }} 
      /></button>

      <button onClick={()=> {
        map.panTo({ lat: location.latitude, lng: location.longitude });
        map.setZoom(20);
      }} className="focus-direction-btn"><img 
        src={userLoc} 
        alt="user Location Icon" 
        style={{ width: '50%', height: '50%' }} 
      /></button>
    </div>
  );
};
