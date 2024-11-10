import { useEffect } from 'react'
import { useLocationContext } from '../../Context/SceneIDcontext.jsx';
import BurialSearch from './BurialSearch.jsx'
import Cementerylot from './../CementeryLot/cementerylot.jsx';
export default function BurialSearchPage(){
    const { scene } = useLocationContext();
    useEffect(() => {
        console.log("burialPage:", scene);
    }, [scene]);

    return(
        <>
            {scene ? <Cementerylot/> : <BurialSearch/> }
        </>
    );

}