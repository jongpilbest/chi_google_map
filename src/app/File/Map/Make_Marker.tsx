import { useDispatch,useSelector } from 'react-redux';

import { useCallback , useState} from 'react';
import {
useAdvancedMarkerRef,
  useMapsLibrary,
  AdvancedMarker,
  Pin
} from "@vis.gl/react-google-maps";

//음식
import './custom-advanced-marker.css';
import { PiBowlFoodFill } from "react-icons/pi";

//쇼핑
import { PiShoppingCartFill } from "react-icons/pi";


//볼거리

import { PiMapPinLineFill } from "react-icons/pi";


import {Place} from './MapType'
type place_plus= Place&{
  opacity:number
}
const colors = ["bg-[#f87171]", "bg-[#fb923c]", "bg-[#facc15]", "bg-[#4ade80]"];
import Map_viewer from './Map_viewer';

function Choose_mark(category_name:string){
  if(category_name=="shooping") return <PiShoppingCartFill></PiShoppingCartFill>
  else if (category_name=="food") return <PiBowlFoodFill></PiBowlFoodFill>
  else return <PiMapPinLineFill></PiMapPinLineFill>
}



export function Make_Marker({ location,id,describe,category,color,opacity }: place_plus) {
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
          
   <div className={`flex flex-col items-center group cursor-pointer radius
   
    `}>
    {/* 동그라미 부분 */}
    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-white shadow-md transition-transform group-hover:scale-110">
      <div className={`flex   ${indexWithId>=0?colors[indexWithId]:`${color}`}  w-5  h-5 items-center justify-center rounded-3xl `}>
       
    {Choose_mark(category)}
        </div>
  
    </div>


 
  </div>

  </AdvancedMarker>



   {

   selet_mark &&  <Map_viewer describe ={describe} id={id} handleMarkerClick={handleMarkerClick} marker={marker}></Map_viewer>
   

   }

 
      
      </>
  )
 
}
