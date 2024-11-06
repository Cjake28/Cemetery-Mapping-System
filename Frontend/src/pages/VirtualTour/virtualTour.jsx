import { useEffect, useState } from 'react';
import './VirtualTour.css'
// import {useSceneIdContext} from '../../Context/SceneIDcontext.jsx';

export default function VirtualTour() {
  // const { sceneID } = useSceneIdContext(); 

  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const onFrameLoaded = (event) => {
  //     if(event.data.cmd === 'frameloaded'){
  //       console.log('Kuula tour loaded!');
       
  //       const postOBJ = event.data?.data?.posts || [];
  //       console.log('Event Data:', postOBJ);
  //       const scnObj = postOBJ.filter((ScnID) => ScnID.title === 'Img 20240922_093659_00_013');
  //       const scnID = scnObj[0]?.id;
  //       console.log(scnID);
  //       window.KuulaPlayerAPI.load(event.data.uuid, scnID);
  //       setLoading(false);
  //       // console.log("Current sceneID in VirtualTour: ", sceneID);
  //     }
  //   };

  //   window.addEventListener('message', onFrameLoaded);
    
  //   return () => {
  //     // Cleanup event listeners
  //     window.removeEventListener('message', onFrameLoaded);
  //   };
  // }, []);

  return (
    <div className="virtualTour">
        {loading && <div style={{ width: '100%', height: '100%', display:'flex', justifyContent: 'center', alignItems: 'center'}}> <h1>Loading....</h1></div>}
        <iframe
          style={{ width: '100%', height: '100%', display: loading ? 'none' : 'block'}}
          src="https://kuula.co/share/collection/7ZX47?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1"
          allowFullScreen
        ></iframe>

    </div>
  );
}
