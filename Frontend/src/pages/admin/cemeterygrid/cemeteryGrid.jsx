import { useState, useEffect, useCallback, useRef  } from 'react';
import { GoogleMap, useJsApiLoader} from '@react-google-maps/api';
import ShowLatLng from './showlatLng.jsx'
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
        center,
        mapBounds, 
        Area1,
        Area2,
        Area3
      }  from '../../../utils/mapgridCoords.js'

const options = {
  disableDefaultUI: true,
  mapTypeControl: false,
  mapTypeId: "satellite",
  gestureHandling: "greedy",
  restriction: {
    latLngBounds: mapBounds,
    strictBounds: true, 
  },
  
};

const googleMap_libraries= ["geometry", "places", "directions"]

export default function CemeteryGrid(){
    const polygonRefs = useRef([]);
    const [showModal, setShowModal] = useState(false);
    const [latlng, setLatLng] = useState(null);


  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: googleMap_libraries,
  });

  const createGridCells = useCallback(
    (map, polygonCoords, RDeg, gridWidth, gridHeight, grCenter, blocks = []) => {
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
  
      for (
        let lat = bounds.getSouthWest().lat();
        lat <= bounds.getNorthEast().lat();
        lat += gridHeight
      ) {
        for (
          let lng = bounds.getSouthWest().lng();
          lng <= bounds.getNorthEast().lng();
          lng += gridWidth
        ) {
          const topLeft = rotatePoint(lat, lng);
          const topRight = rotatePoint(lat, lng + gridWidth);
          const bottomRight = rotatePoint(lat + gridHeight, lng + gridWidth);
          const bottomLeft = rotatePoint(lat + gridHeight, lng);
  
          const cellCoords = [topLeft, topRight, bottomRight, bottomLeft];
  
          const cellCenter = new window.google.maps.LatLng(
            (topLeft.lat + bottomRight.lat) / 2,
            (topLeft.lng + bottomRight.lng) / 2
          );
  
          const isInsidePolygon = window.google.maps.geometry.poly.containsLocation(
            cellCenter,
            new window.google.maps.Polygon({ paths: polygonCoords })
          );
  
          if (isInsidePolygon) {
            const polygon = new window.google.maps.Polygon({
              paths: cellCoords,
              strokeColor: '#FFFF00', // Default color
              strokeOpacity: 0.4,
              strokeWeight: 0.6,
              fillColor: '#00FF00', // Default fill color
              fillOpacity: 0,
              map: map,
            });
  
            // Check if the cellCenter is within any block and apply its color
            blocks.forEach((block) => {
              const isInsideBlock = window.google.maps.geometry.poly.containsLocation(
                cellCenter,
                new window.google.maps.Polygon({ paths: block.bounds })
              );
  
              if (isInsideBlock) {
                polygon.setOptions({ strokeColor: block.color }); // Set block-specific color
              }
            });
  
            // Store each polygon instance
            polygonRefs.current.push(polygon);
  
            // Add hover events
            polygon.addListener('mouseover', () => {
              polygon.setOptions({ fillOpacity: 1 }); // Change color on hover
            });
  
            polygon.addListener('mouseout', () => {
              polygon.setOptions({ fillOpacity: 0 }); // Revert to original color
            });
  
            polygon.addListener('click', () => {
              setLatLng({ lat: cellCenter.lat(), lng: cellCenter.lng() });
              setShowModal(true);
            });
          }
        }
      }
    },
    []
  );
  
  const onLoad = useCallback((mapInstance) => {
    createGridCells(mapInstance, polygonCoords1, -25, 0.0000258,0.00001, center, Area1); // Grid for first area
    createGridCells(mapInstance, polygonCoords2, -27, 0.0000258,0.00001, {lat:14.888463243850705, lng: 120.7796897391385}, Area2); // Grid for second area
    createGridCells(mapInstance, polygonCoords3, -25.3, 0.0000258,0.00001, center, Area3);
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

    // new window.google.maps.Polygon({
    //   paths: polygonCoords2,
    //   strokeColor: '#FF0000',
    //   strokeOpacity: 0.4,
    //   strokeWeight: 0.6,
    //   fillColor: '#00FF00', // Original color
    //   fillOpacity: 0.1,
    //   map: mapInstance,
    // });

  }, [createGridCells]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cemeteryLotMap-container">
    <div style={{ height: '100%', width: '100%'}} className='cemeteryLotMap-container'>
      <GoogleMap
        zoom={24} // Adjusted zoom to better see the shapes
        center={center}
        mapContainerStyle={{ height: '100%', width: '100%' }}
        options={options}
        onLoad={onLoad}
      /> 
    </div>

    {showModal && (
        <ShowLatLng
          latlng={latlng}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};
