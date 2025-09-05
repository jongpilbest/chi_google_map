import React, { useMemo } from 'react'
import {
  APIProvider,
  Map,
MapControl,
ControlPosition
} from "@vis.gl/react-google-maps";
import { useEffect,useState ,useCallback , useRef} from 'react';
import {Place} from './MapType'
import Direction from './Direction';
import Zoom_in from './Zoom_in';
import { useDispatch,useSelector,shallowEqual  } from 'react-redux';

import {AutocompleteCustom} from '../auto_search/autocomletecomponent'
import Autocomplete_Result from '../auto_search/Autocomplete_Result';

import Marker_set from './Marker_set';
    const color:string[]= ['#A29BFE','#A29BFE','#F08AF4','#F08AF4']

export default function Mappage() {


    //const [comment, setcomment]=useState<Place[]>([]);


  const current_index = useSelector((state: any) => state.url.url_current_index);

  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.Place | null>(null);
    
    
   //데이터가 증가하게 하고 그게 색으로 변하게 하는지???? 이런것좀 체크 부탁요 
    // 경로에요
   const polylinesRef = useRef<google.maps.Polyline[]>([]);
   const Check_check= useSelector((state: any) => state.contorller.Check_check);
 


    useEffect(()=>{

      // 사용자의 맞춤 경로 때문에 발생하는 초록색 Direction 부분
      if(Check_check){
        polylinesRef.current.map((el)=>{
          el.setOptions({ strokeColor: '#808080',strokeOpacity: 0.2  });
        })
      }
      else{
        polylinesRef.current.map((el,index)=>{
          if(index==current_index) {
             el.setOptions({ strokeColor:color[index+1] ,strokeOpacity: 0.8   });
          }
          else{
              el.setOptions({ strokeColor: '#808080',strokeOpacity: 0.2  });
          }
        })

      }

    },[Check_check,current_index])




    // mark 안에 넣나 안넣나 확인부탁 

    const Mark_Pin_set = useSelector((state: any) => state.contorller.selectedMark );
  
    const comment= useSelector((state:any)=>state.data_store.location_data,shallowEqual ) as any[];
    
    const lastComment = comment[comment.length - 1];
//url_current_index


     
   // 여기 부분 고치기 




  

  
  








 

  const filteredComment = useMemo(() => {
    // 여기서 문제였군 .. 
   if(comment.length>0){
   
     return   comment.flat().filter((el)=>Mark_Pin_set.has(el.id))    
   } 

  }, [Mark_Pin_set, Check_check]);


   const API_KEY = 'AIzaSyBkXahoUxLe2LROntj84Lra95YI-BXqunc';
  return (
      <div className=" flex-[5]   rounded-lg">
        

     <APIProvider 
     apiKey={API_KEY}>
       <Map
         mapId='c6ee764519ee05b0d0b9fec4'
         colorScheme='LIGHT'
         defaultCenter={{lat: 35.68, lng: 139.69}}
     defaultZoom={10}
     gestureHandling={'greedy'}
     fullscreenControl={false}

     mapTypeControl={false}
       >
        <Zoom_in></Zoom_in>
        

        <Marker_set comment={comment}></Marker_set>
     
         {
          comment.length>1&&  lastComment  && 
           <Direction  key="base" color={color[polylinesRef.current.length+1]} check={true} comment={lastComment}  polylinesRef={polylinesRef}
           ></Direction>
          }
            {
            Check_check&&<Direction color='#4DD599' key="filtered" check={false}  comment={filteredComment} polylinesRef={polylinesRef}
             ></Direction>
           }

   
       {
         
         <>
            <MapControl position={ControlPosition.TOP_LEFT}>
               <AutocompleteCustom  onPlaceSelect={setSelectedPlace}>

               </AutocompleteCustom>
         </MapControl>
         <Autocomplete_Result place={selectedPlace} />
   
         </>
         
       }
      


       </Map>
     </APIProvider>
     </div>
  )
}

// commnet을 넣는게 아니라.. filter 해야됨.. 이러면  ㅎ...



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

//
//      <Direction  key="base" color={color[polylinesRef.current.length]} check={true} comment={comment}  polylinesRef={polylinesRef}
//       ></Direction>
//      {
//        Check_check&&<Direction color='#4DD599' key="filtered" check={false}  comment={filteredComment} polylinesRef={polylinesRef}
//         ></Direction>
//      }