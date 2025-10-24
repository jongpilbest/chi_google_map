import { useDispatch,useSelector,shallowEqual } from 'react-redux';

import { useCallback , useState} from 'react';
import {
useAdvancedMarkerRef,
  useMapsLibrary,
  AdvancedMarker,
  Pin
} from "@vis.gl/react-google-maps";

//음식
import './custom-advanced-marker.css';

import { map_click_toggle } from '@/app/Redux/store'


import {Place} from './MapType'

const colors = {"pink":"bg-[#F08AF4]", 
  "purple":"bg-[#9C6CFE]",
   1:"bg-[#E57373]",
   2:"bg-[#FFB74D]",
   3:"bg-[#64B5F6]",
   4:"bg-[#81C784]"
};

import Map_viewer from './Map_viewer';



export function Make_Marker({ location,id,color,opacity,emozi }) {


    const [markerRef, marker] = useAdvancedMarkerRef();

    const dispatch= useDispatch()
  
  
  const Mark_Pin_set = useSelector((state) => state.contorller.selectedMark)
  const { map_click, clicked_marker_id } = useSelector((state) => state.data_store);



   const indexWithId = Mark_Pin_set.findIndex((set) => {
   return set.has(id)});




   
   const handleMarkerClick = ()=>{
      dispatch(map_click_toggle(null));
      // 여기 코드 보니까 넣은거 같은데?
    }


     useMapsLibrary('places');
     // Handle marker click to select this place

    // Handle info window close by deselecting this place
  
 const isOpen = map_click && clicked_marker_id === id;
  return(
   <>
        <AdvancedMarker
          ref={markerRef}
          position={location}
         style={{ opacity:indexWithId>=0?1 :opacity }}
          onClick={()=>dispatch(map_click_toggle(id))}  
        >
          
   <div className={`flex flex-col items-center group cursor-pointer radius
   
    `}>
    {/* 동그라미 부분 */}
    <div className="flex items-center justify-center  border-green-800 border-2  bg-white text-white  transition-transform group-hover:scale-110">
     <div className={`flex items-center justify-center ${color ? `${colors[color]}` : 'bg-white'}`}>
       
<span
  className={`${
    color ? 'text-[20px]' : 'text-[13px]'
  } transition-all duration-200`}
>
  {emozi}
</span>
        </div>
  
    </div>


 
  </div>

  </AdvancedMarker>



   {

   isOpen &&  <Map_viewer id={id} handleMarkerClick={handleMarkerClick}></Map_viewer>
   

   }


      
      </>
  )
 
}
