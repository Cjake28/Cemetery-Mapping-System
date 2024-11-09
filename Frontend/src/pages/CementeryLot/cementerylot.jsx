import {useEffect,useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Polygon, Marker, Rectangle } from '@react-google-maps/api';
import {useLocationContext} from '../../Context/SceneIDcontext.jsx';
import {GeolocationContext} from '../../Context/geolocationContext.jsx';
import markerSvg from '../../assets/uncle-svgrepo-com.svg';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

// const target = { lat: 14.888649680123114, lng: 120.77962852912253 };

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

const polygonPath = [
  //for testing
  { lat: 14.904080524364822, lng: 120.788730885781 },
  { lat: 14.904033633321532, lng: 120.78930734470765 },
  { lat: 14.90356284667923, lng: 120.78913654206295 },
  { lat: 14.90375603813445, lng: 120.78858919722349 },

  // for prduction
  // { lat: 14.8888116371095, lng: 120.77787947308613 },
  // { lat: 14.890034439165516, lng: 120.78035776034305 },
  // { lat: 14.88959357246283, lng: 120.78062391085757 },
  // { lat: 14.888521304435601, lng: 120.78041934311165 },
  // { lat: 14.887797921005744, lng: 120.77949338482969 },
  // { lat: 14.888037909958108, lng: 120.77858975718522 },

];

// const currentPosition = {
//   lat: 14.888821,
//   lng: 120.779467,
// }

// Define polygon coordinates
const polygonCoords1 = [
  { lat: 14.888428649855367, lng: 120.7792146461656 },
  { lat: 14.888429297895827, lng: 120.77922872776331 },
  { lat: 14.88843577830024, lng: 120.77924549157011 },
  { lat: 14.888442906744881, lng: 120.77927365476552 },
  { lat: 14.888452627350837, lng: 120.77930450016993 },
  { lat: 14.888459755795186, lng: 120.77933333391682 },
  { lat: 14.888465588158924, lng: 120.77935546213988 },
  { lat: 14.88847595680417, lng: 120.77938027257393 },
  { lat: 14.888488917609989, lng: 120.77942251736702 },
  { lat: 14.888496694093131, lng: 120.779452021667 },
  { lat: 14.888499934294586, lng: 120.7794681149211 },
  { lat: 14.888508358817527, lng: 120.77948353762336 },
  { lat: 14.888530392183693, lng: 120.77949627811653 },
  { lat: 14.888553073587673, lng: 120.77950164253468 },
  { lat: 14.888564090269433, lng: 120.77950298363896 },
  { lat: 14.888607508949997, lng: 120.77947884375571 },
  { lat: 14.888625654067228, lng: 120.77949359590504 },
  { lat: 14.888636670744585, lng: 120.77949225480049 },
  { lat: 14.888694994321256, lng: 120.7794634210528 },
  { lat: 14.888698882559137, lng: 120.77947549099369 },
  { lat: 14.88872610022418, lng: 120.77946811491817 },
  { lat: 14.888744912016865, lng: 120.77946289699855 },
  { lat: 14.888791570856304, lng: 120.77945283871469 },
  { lat: 14.888826564979045, lng: 120.77944143932606 },
  { lat: 14.88884211792066, lng: 120.77944613319198 },
  { lat: 14.888887480661788, lng: 120.77943003993742 },
  { lat: 14.88891729045714, lng: 120.77943473380331 },
  { lat: 14.88897626199748, lng: 120.77940992336926 },
  { lat: 14.88900735803431, lng: 120.77940999563596 },
  { lat: 14.889046888393025, lng: 120.77939658459063 },
  { lat: 14.889072809935282, lng: 120.77939524348609 },
  { lat: 14.889107804012339, lng: 120.77938652630657 },
  { lat: 14.889145390237717, lng: 120.77937579747066 },
  { lat: 14.8891764960738, lng: 120.7793637275298 },
  { lat: 14.889227043047878, lng: 120.77933154102074 },
  { lat: 14.889216026400684, lng: 120.77930807169123 },
  { lat: 14.889220562667244, lng: 120.77930136616853 },
  { lat: 14.889197881333542, lng: 120.77925845082491 },
  { lat: 14.88918621664669, lng: 120.77923833425855 },
  { lat: 14.889173903920996, lng: 120.77921017106314 },
  { lat: 14.889156406888537, lng: 120.77917396124045 },
  { lat: 14.88913307750972, lng: 120.77912903423822 },
  { lat: 14.889116876550712, lng: 120.77908343668375 },
  { lat: 14.889092251090709, lng: 120.77905057962242 },
  { lat: 14.889025503118678, lng: 120.77909885938568 },
  { lat: 14.888991157066993, lng: 120.77909081275885 },
  { lat: 14.888925705140004, lng: 120.77914177473102 },
  { lat: 14.88887515809388, lng: 120.77916323240373 },
  { lat: 14.888840812017158, lng: 120.77917530234491 },
  { lat: 14.888796745345713, lng: 120.77917329068814 },
  { lat: 14.888750734546669, lng: 120.7791786551063 },
  { lat: 14.888706667856473, lng: 120.77917798455428 },
  { lat: 14.888664545276011, lng: 120.77917731400235 },
  { lat: 14.888609461889398, lng: 120.77917396124121 },
  { lat: 14.88857057949047, lng: 120.77918334897254 },
  { lat: 14.888553082409016, lng: 120.77916256185212 },
  { lat: 14.888527160804053, lng: 120.7791625618524 },
];

const polygonCoords2 =[
  { lat: 14.888313995248152, lng: 120.77933549777832 },
  { lat: 14.888280297122796, lng: 120.77938109533274 },
  { lat: 14.888277056917968, lng: 120.77946558491851 },
  { lat: 14.888274464754314, lng: 120.77949575977073 },
  { lat: 14.88827640887705, lng: 120.77955409781838 },
  { lat: 14.888280945163393, lng: 120.77960103647742 },
  { lat: 14.888290665776843, lng: 120.7796613861768 },
  { lat: 14.888315939369237, lng: 120.77972374753807 },
  { lat: 14.888338620797237, lng: 120.77975928680803 },
  { lat: 14.888374911075077, lng: 120.77981762485481 },
  { lat: 14.888402128779926, lng: 120.77987663345353 },
  { lat: 14.888428698440695, lng: 120.7799202193507 },
  { lat: 14.888466284784682, lng: 120.77997118132248 },
  { lat: 14.888566731016518, lng: 120.77990747885553 },
  { lat: 14.888751422351062, lng: 120.77981695430034 },
  { lat: 14.888770863536461, lng: 120.7798350592116 },
  { lat: 14.88890824785219, lng: 120.77979348497142 },
  { lat: 14.889009341915447, lng: 120.77975325183597 },
  { lat: 14.888882974329452, lng: 120.77951118246955 },
  { lat: 14.888812338055178, lng: 120.7795212407544 },
  { lat: 14.88872679684929, lng: 120.77953934566551 },
  { lat: 14.888654864445488, lng: 120.7795520861584 },
  { lat: 14.888586820257569, lng: 120.77956750886032 },
  { lat: 14.888551178054918, lng: 120.77956817941234 },
  { lat: 14.888528496650238, lng: 120.7795722027262 },
  { lat: 14.888505815243269, lng: 120.77956616775592 },
  { lat: 14.888487022075555, lng: 120.77955409781532 },
  { lat: 14.888463044583165, lng: 120.77953062848655 },
  { lat: 14.88844943573509, lng: 120.77951051191936 },
  { lat: 14.888435178845679, lng: 120.77947161988824 },
  { lat: 14.88841638567196, lng: 120.779417305155 },
  { lat: 14.88840472094254, lng: 120.77937707201949 },
  { lat: 14.888395648374905, lng: 120.77935226158651 },
  { lat: 14.88838333560378, lng: 120.77930733458508 },
  { lat: 14.888345749246113, lng: 120.77932074563056 },
  { lat: 14.88831788349401, lng: 120.77933348612372 },
];


const polygonCoords3 =[
  { lat: 14.888928408387521, lng: 120.77956359092204 },
  { lat: 14.889237562733989, lng: 120.78007145311287 },
  { lat: 14.889421377086553, lng: 120.77995854603618 },
  { lat: 14.889196943941572, lng: 120.77947252597531 },
  { lat: 14.88918001944169, lng: 120.77944800849063 },
  { lat: 14.889163094940093, lng: 120.77944800849171 },
  { lat: 14.888973540437346, lng: 120.77948887096674 },
];

const polygonCoords4 =[
  { lat: 14.889200037546086, lng: 120.77937618989375 },
  { lat: 14.889622557997654, lng: 120.78019292255695 },
  { lat: 14.88967310486708, lng: 120.78014598389791 },
  { lat: 14.889245400210717, lng: 120.77933998007104 },
];

const polygonCoords5 =[
  { lat: 14.88886485797095, lng: 120.77970203502551 },
  { lat: 14.889018241313327, lng: 120.77975540720091 },
  { lat: 14.88922320472585, lng: 120.78011637165059 },
  { lat: 14.889145834454531, lng: 120.78022732959417 },
  
]

// const polygonPaths = [
//   {lat: 14.888947, lng:120.779360},
//   {lat:14.888919, lng:120.779374 },
//   {lat:14.888931, lng:120.779395},
//   {lat:14.888954, lng:120.779382},
// ]

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
    <div style={{ height: '100vh', width: '100vw' }}>
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
  );
};

export default Cementerylot;
