import {AdvancedMarker, Pin, useMap ,useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import React, {useEffect,useState,useCallback} from 'react';

interface Props {
  place: google.maps.places.Place | null;
}

import { data_Store_change } from '@/app/Redux/store';

import { useDispatch, UseDispatch } from 'react-redux';

import Map_viewer from '../Map/Map_viewer';

const AutocompleteResult = ({place}: Props) => {
  const map = useMap();
  const dispatch= useDispatch()


   const [seleted_mark, setselected_mark] = useState<boolean>(true);
      const [markerRef, marker] = useAdvancedMarkerRef();

  // adjust the viewport of the map when the place is changed
  useEffect(() => {
    if (!map || !place) return;
    if (place.viewport) map.fitBounds(place.viewport);

    dispatch(data_Store_change({
    "data":{  "id":place?.id,
    "location":place?.location},
    "index":0

   }))

  }, [map, place]);
      
   const handleMarkerClick = ()=>{
      setselected_mark((el)=>!el)
    }


  if (!place) return null;


  // add a marker for the selected place




  return (
    <>
    <AdvancedMarker
    ref={markerRef}
    onClick={handleMarkerClick}
    position={place.location}>
      <Pin
        background='#FFD166'
        glyphColor="#FFFFFF"
        borderColor="#FFFFFF"
        scale={0.8}
      />
    </AdvancedMarker>

     {
   seleted_mark&&   <Map_viewer
   marker={marker}
   describe ={null} id={place.id} handleMarkerClick={handleMarkerClick}></Map_viewer>
     }
    

 

   
    </>
   


  );
};

export default React.memo(AutocompleteResult);

//      <Map_viewer describe ={null} id={place.id} handleMarkerClick={handleMarkerClick}></Map_viewer>