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

import { useDispatch,useSelector } from 'react-redux';
import { Make_Marker } from './Make_Marker';
import {AutocompleteCustom} from '../auto_search/autocomletecomponent'
import Autocomplete_Result from '../auto_search/Autocomplete_Result';
import { toggleMark} from '@/app/Redux/store';
export default function Mappage() {
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  const [selectedMark, setselectedMark] = useState<string[]>([]);
  const dispatch = useDispatch();

    const [comment, setcomment]=useState<Place[]>([]);
    const color= useMemo(()=> ['#A29BFE','#A29BFE','#FAFF68','#F08AF4'],[])

    // 여기 선언해놨구나..
    
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.Place | null>(null);
    
    
   //데이터가 증가하게 하고 그게 색으로 변하게 하는지???? 이런것좀 체크 부탁요 
    // 경로에요
   const polylinesRef = useRef<google.maps.Polyline[]>([]);


   //마커에요
   const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[][]>([]);


   const youtube_link = useSelector((state: any) => state.url.url);
    // 유투브 링크 
 

    const Mark_Pin_set = useSelector((state: any) => state.contorller.selectedMark);
    const Check_check= useSelector((state: any) => state.contorller.Check_check);
    const show_search= useSelector((state: any) => state.contorller.show_search);

   // 여기 부분 고치기 


    useEffect(()=>{
    
     if(youtube_link){
      const eventsource= new EventSource(`http://localhost:8000/script?video_url=${encodeURIComponent(youtube_link)}`)
     eventsource.onmessage=(event)=>{
      let comment=  JSON.parse(event.data);
      // 여기서 데이터 가 들어오면 함수호출로 해도 되겠네.. 
      setcomment(comment)
           //change_color()

     }

    //if (data.done) {
    //  eventsource.close(); // ✅ 결과 다 받으면 닫기 --> 우선은 "실시간으로 한다고 가정하고 .. 열어놓은거임"
    //  return;
    //}
     eventsource.onerror= (error)=>{
      eventsource.close();
     }
  
     return ()=>{
      eventsource.close();
     }
     }
  
    },[youtube_link])

   
    const AggregatePin= useCallback((id:string)=>{
    dispatch(toggleMark(id))
    },[])

    useEffect(()=>{

      // cehck_check 사실이면 이전꺼 색 다 죽여줘 polylinesRef.current[0].setOptions({ strokeColor: '#808080' });
      if(Check_check){
        polylinesRef.current.map((el)=>{
          el.setOptions({ strokeColor: '#808080',strokeOpacity: 0.2  });
        })
      }
      else{
        polylinesRef.current.map((el,index)=>{
          el.setOptions({ strokeColor:'#9C6CFE' ,strokeOpacity: 0.8 ,  });
        })

      }

      // false 이면 다시 색 돌아오게 해줘


    },[Check_check])



    const placeMarkers = useMemo(() => {

 // 여기 그 selectedPlaceId 때문에 useMemo 으로 잡은거임 
 
    return comment.map((place, index) => (
      <Make_Marker
        describe={ place.describe}
        index={index}
        key={place.id || index}
        id={place.id}
        marking={Mark_Pin_set.includes(place.id)}
        selected={place.id === selectedPlaceId}
        locaiton={place.location}
        onClick={() => setSelectedPlaceId(place.id)}
        PinonClick={()=>AggregatePin(place.id) }
      />
    ));

  // 여기 바로 되는걸로 됬네.. 여기를 함수를 파서 잡아봐 

  }, [comment, selectedPlaceId,Mark_Pin_set]);





  const handleMapClick = useCallback(() => {
    setSelectedPlaceId(null);
  },[]);


  const filteredComment = useMemo(() => {
  return comment.flat().filter((el)=>Mark_Pin_set.includes(el.id))
}, [ comment, Mark_Pin_set, Check_check]);


   const API_KEY = 'AIzaSyBkXahoUxLe2LROntj84Lra95YI-BXqunc';
  return (
      <div className=" flex-[5]   rounded-lg">
        

     <APIProvider 
     apiKey={API_KEY}>
       <Map
        onClick={handleMapClick}
         mapId='c6ee764519ee05b0d0b9fec4'
         colorScheme='LIGHT'
         defaultCenter={{lat: 35.68, lng: 139.69}}
     defaultZoom={10}
     gestureHandling={'greedy'}
     fullscreenControl={false}

     mapTypeControl={false}
       >
         {placeMarkers}
      <Direction  key="base" color={color[polylinesRef.current.length]} check={true} comment={comment}  polylinesRef={polylinesRef}
       ></Direction>
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