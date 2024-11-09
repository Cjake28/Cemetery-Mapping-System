import { useState } from 'react'
import { useLocationContext } from '../../Context/SceneIDcontext.jsx';
import BurialSearch from './BurialSearch.jsx'
import Cementerylot from './../CementeryLot/cementerylot.jsx';
export default function BurialSearchPage(){
    const { scene } = useLocationContext();

    return(
        <>
            {scene ? <Cementerylot/> : <BurialSearch/> }
        </>
    );

}