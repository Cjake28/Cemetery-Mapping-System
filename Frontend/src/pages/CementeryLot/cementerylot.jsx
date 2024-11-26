import {useEffect,useState, useCallback, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Polygon, Marker, DirectionsRenderer, InfoWindow   } from '@react-google-maps/api';
import {useLocationContext} from '../../Context/SceneIDcontext.jsx';
import {GeolocationContext} from '../../Context/geolocationContext.jsx';
import markerSvg from '../../assets/personLoc.svg';
import plotpos from '../../assets/position.svg'
import './cemeteryLot.css';
import { FiDelete , FiTarget, FiMapPin, FiDisc } from "react-icons/fi";
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
}  from '../../utils/mapgridCoords.js';

const googleMap_libraries= ["geometry", "places", "directions"];

const options = {
  disableDefaultUI: true,  // Disable default UI controls
  mapTypeControl: false,   // Hide map type controls
  mapTypeId: "satellite",  // Satellite view
  gestureHandling: "greedy"
};

export default function Cementerylot (){
  const {locationContext, setScene,person_name_loc, setPerson_name_loc} = useLocationContext();
  const {location, startWatchingLocation, getCurrentLocation } = GeolocationContext();
  const [directions, setDirections] = useState(null);
  const [map, setMap] = useState(null);
  const [infoWindowVisible, setInfoWindowVisible] = useState(false); 
  const solidLineRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: googleMap_libraries,
  });

  const createGridCells = useCallback((map, polygonCoords, RDeg, gridWidth, gridHeight, grCenter) =>{
    const rotationAngle = (RDeg * Math.PI) / 180;

    const bounds = new window.google.maps.LatLngBounds();
    polygonCoords.forEach((coord) => bounds.extend(coord));

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

        if (
          window.google.maps.geometry.poly.containsLocation(
            cellCenter,
            new window.google.maps.Polygon({ paths: polygonCoords})
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
      directionsService.route(
        {
          origin: new window.google.maps.LatLng(currentLocation.latitude, currentLocation.longitude),
          destination: new window.google.maps.LatLng(locationContext.lat, locationContext.lng),
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result); // Set the directions result to render it
            
            // Get the last latitude and longitude from the route
            const lastLeg = result.routes[0].legs[result.routes[0].legs.length - 1];
            const lastLatLng = lastLeg.end_location;
            
            if (solidLineRef.current) {
              solidLineRef.current.setMap(null);
              solidLineRef.current = null;
            }

            // Create a new solid line from the last location to the target location
            const solidLine = new window.google.maps.Polyline({
              path: [
                { lat: lastLatLng.lat(), lng: lastLatLng.lng() },
                {lat:locationContext.lat, lng: locationContext.lng},
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
  
  // Add this function in the component to update directions on location change
  // useEffect(() => {
  //   if (location) {
  //     startDirection();
  //   }
  // }, [location]); // Depend on location updates

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
          onClick={() => setInfoWindowVisible(!infoWindowVisible)}
        />
        {infoWindowVisible && (
            <InfoWindow
            position={locationContext}
            onCloseClick={() => setInfoWindowVisible(false)} // Close InfoWindow when X is clicked
          >
            <div className="info-window">
              <h4>Marker Details</h4>
              <p><strong>Name:</strong> {person_name_loc.fullname}</p>
              <p><strong>Location:</strong> {person_name_loc.location}</p>
            </div>
          </InfoWindow>
          )}
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
      <button onClick={()=> {setScene(false); setPerson_name_loc(null)}} className="cemeteryLot-back-btn"><FiDelete  style={{height:'60%', width:'60%'}}/></button>
      <button onClick={()=> {
        map.panTo({ lat: location.latitude, lng: location.longitude });
        map.setZoom(20);
      }} className="focus-direction-btn"><FiDisc style={{height:'100%', width:'100%'}}/></button>
    </div>
  );
};