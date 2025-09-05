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

import Map_viewer from './Map_viewer';

export function Make_Marker({ location,id,describe,index,color,opacity }: place_plus) {
    const [markerRef, marker] = useAdvancedMarkerRef();

   const [selet_mark, setselected_mark] = useState<boolean>(false);

   const Mark_Pin_set = useSelector((state: any) => state.contorller.selectedMark).has(id);
      
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
         style={{ opacity:Mark_Pin_set?1 :opacity }}
      onClick={handleMarkerClick}  
        >
          <Pin
    background={Mark_Pin_set?"#4DD599":color}
    glyphColor="#FFFFFF"
    borderColor="#FFFFFF"
    scale={Mark_Pin_set?1:0.7}

    glyph={index?.toString()}
  />
  </AdvancedMarker>



   {

   selet_mark &&  <Map_viewer describe ={describe} id={id} handleMarkerClick={handleMarkerClick} marker={marker}></Map_viewer>
   

   }

 
      
      </>
  )
 
}
