'use client';

import React, { useMemo } from 'react'

import {
  APIProvider,
  Map,

MapControl,
ControlPosition
} from "@vis.gl/react-google-maps";

import { map_click_toggle } from '@/app/Redux/store';

import { useEffect,useState ,useCallback , useRef} from 'react';
import {Place} from './MapType'
import Direction from './Direction';
import Zoom_in from './Zoom_in';
import { useDispatch,useSelector,shallowEqual  } from 'react-redux';

import Border_map from './Border_map'

import {AutocompleteCustom} from '../auto_search/autocomletecomponent'
import Autocomplete_Result from '../auto_search/Autocomplete_Result';

import Marker_set from './Marker_set';
const color:string[]= ['#A29BFE','#A29BFE','#F08AF4','#F08AF4']
const colors_root = ["#f87171", "#fb923c", "#facc15", "#4ade80"];


export default function Mappage({name}) {


   const dispatch= useDispatch()



  const current_index = useSelector((state: any) => state.url.url_current_index);

  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.Place | null>(null);
    
    
   //데이터가 증가하게 하고 그게 색으로 변하게 하는지???? 이런것좀 체크 부탁요 
    // 경로에요
   const polylinesRef = useRef<google.maps.Polyline[]>([]);


   const Check_check= useSelector((state: any) => state.contorller.Check_check);
 


    useEffect(()=>{

      // 사용자의 맞춤 경로 때문에 발생하는 초록색 Direction 부분
      // 경로를 이제 지우지 말까.?
   
      // 경로 바꾸는거 
 
        polylinesRef.current.map((el,index)=>{
          if(index==current_index) {
             el.setOptions({ strokeColor:color[index+1] ,strokeOpacity: 0.8  });
          }
          else{
              el.setOptions({ strokeColor: color[index],strokeOpacity: 0.2  });
          }
        })

      

    },[Check_check])




    // mark 안에 넣나 안넣나 확인부탁 

     // 수정할거
    const Mark_Pin_set = useSelector((state: any) => state.contorller.selectedMark )
    const Find_index_mark_pin =  useSelector((state: any) => state.contorller.select_mark_index )
  
    const comment= useSelector((state:any)=>state.data_store.location_data,shallowEqual) as any[];
 



  const filteredComment = useMemo(() => {
    // 여기서 문제였군 .. 
   if(comment.length>0){
     //Mark_Pin_set 배열형태로 굳이 내가 다시 filter 할이유 없고 어쩌피 지금 필요한게,  location 이라면... 
     // 여기 true 인 인덱스만 뽑아
 


     return  comment.flat().filter((el)=>Mark_Pin_set[Find_index_mark_pin].has(el.id))    
   } 

  }, [ Mark_Pin_set,Find_index_mark_pin]);


   const API_KEY = 'AIzaSyBkXahoUxLe2LROntj84Lra95YI-BXqunc';
  return (
      <div className=" w-full h-full   rounded-lg">
        

     <APIProvider 
     apiKey={API_KEY}>
 

  

  
       <Map
         mapId='c6ee764519ee05b0312e3370'
         colorScheme='LIGHT'
         defaultCenter={name=='newyork'?{lat: 40.7580, lng: -73.9855}:{lat: 48.87536488825122, lng: 2.3401}}
     defaultZoom={13}
     gestureHandling={'greedy'}
     fullscreenControl={false}
      onClick={()=> dispatch(map_click_toggle(null))}
     mapTypeControl={false}
       >
        <Zoom_in></Zoom_in>
        <Border_map></Border_map>

        <Marker_set comment={comment}></Marker_set>
     
     
            {
            Check_check>-1 &&<Direction  key="filtered" check={true}  polylinesRef={polylinesRef}
             ></Direction>
             }

   
       {
         
         <>
          
         </>
         
       }
  


       </Map>
     
     </APIProvider>
     </div>
  )
}

// commnet을 넣는게 아니라.. filter 해야됨.. 이러면  ㅎ...

 // <MapControl position={ControlPosition.TOP_LEFT}>
 //              <AutocompleteCustom  onPlaceSelect={setSelectedPlace}>
//
 //              </AutocompleteCustom>
 //        </MapControl>
 //        <Autocomplete_Result place={selectedPlace} />
 //  <> 여기사이에




// 여기 밑에 그 경로 넣고 걍 없애는거 넣어야되겠다. 체크 되면 걍 만들어주는걸로 oㅋ 

//<Direction comment={comment}  polylinesRef={polylinesRef}
//        ></Direction>



 // {place&& place.map((El,idx)=>{
 //            return  <AdvancedMarker 
 //   ref={(marker) => {
 //     if (marker) {
 //       markersRef.current[idx] = marker; // AdvancedMarkerElement 저장
 //     }
 //   }}
//
//
 //            key={El.name}
 //            position={El.position}>
 //            <Pin scale={0.6} background="#ff0000 " borderColor="#230302 " glyphColor="#fffffd " ></Pin>
 // </AdvancedMarker>
 //        }) }
//

//  경로 
//comment.length>1&&  lastComment  && 
//           <Direction  key="base" color={color[polylinesRef.current.length+1]} check={true} comment={lastComment}  polylinesRef={polylinesRef}
//           ></Direction>