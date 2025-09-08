import { useDispatch,useSelector } from 'react-redux';

import { useCallback , useState} from 'react';
import {
useAdvancedMarkerRef,
  useMapsLibrary,
  AdvancedMarker,
  Pin
} from "@vis.gl/react-google-maps";


import {Place} from './MapType'
type place_plus= Place&{
  opacity:number
}
const colors = ["#f87171", "#fb923c", "#facc15", "#4ade80"];
import Map_viewer from './Map_viewer';

export function Make_Marker({ location,id,describe,index,color,opacity }: place_plus) {
    const [markerRef, marker] = useAdvancedMarkerRef();

   const [selet_mark, setselected_mark] = useState<boolean>(false);

   // 수정할거 
   const Mark_Pin_set = useSelector((state: any) => state.contorller.selectedMark)
   const indexWithId = Mark_Pin_set.findIndex((set: any) => {
   return set.has(id)});
   const handleMarkerClick = ()=>{
   
      setselected_mark((el)=>!el)
      // 여기 코드 보니까 넣은거 같은데?

    }


     useMapsLibrary('places');
     // Handle marker click to select this place

    // Handle info window close by deselecting this place
  

  return(
   <>
        <AdvancedMarker
          ref={markerRef}
          position={location}
         style={{ opacity:indexWithId>=0?1 :opacity }}
      onClick={handleMarkerClick}  
        >
          <Pin
    background={indexWithId>=0?colors[indexWithId]:color}
    glyphColor="#FFFFFF"
    borderColor="#FFFFFF"
    scale={indexWithId>=0?0.8:0.7}

    glyph={index?.toString()}
  />
  </AdvancedMarker>



   {

   selet_mark &&  <Map_viewer describe ={describe} id={id} handleMarkerClick={handleMarkerClick} marker={marker}></Map_viewer>
   

   }

 
      
      </>
  )
 
}
