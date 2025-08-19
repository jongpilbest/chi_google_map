import React from 'react'
import {
  APIProvider,
  Map,
  useMap,
  AdvancedMarker,
  useMapsLibrary,
  Pin
} from "@vis.gl/react-google-maps";
import { useEffect,useState ,useCallback , useRef} from 'react';
import Point_map from './Point_map';
import { useSelector } from 'react-redux';
import { MarkerClusterer } from "@googlemaps/markerclusterer";
//import type { Marker } from "@googlemaps/markerclusterer";
import {Place} from './MapType'
import Direction from './Direction';




export default function Mappage() {
    const [markers, setMarkers] = useState<{[key: string]: Place}>({});
   
    const [comment, setcomment]=useState<string[]>([]);
    const [ color, setcolor]= useState(["#FF0000"])
    
   //데이터가 증가하게 하고 그게 색으로 변하게 하는지???? 이런것좀 체크 부탁요 
    // 경로에요
   const polylinesRef = useRef<google.maps.Polyline[]>([]);


   //마커에요
   const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[][]>([]);



   const youtube_link = useSelector((state: any) => state.url.url);
    //const [place, setplace]= useState<any[]>();

  
    useEffect(()=>{
    
     if(youtube_link){
      const eventsource= new EventSource(`http://localhost:8000/script?video_url=${encodeURIComponent(youtube_link)}`)
     eventsource.onmessage=(event)=>{
      let comment=  JSON.parse(event.data);
      // 여기서 데이터 가 들어오면 함수호출로 해도 되겠네.. 
      Make_Marker(comment)
      setcomment(comment)

     }
     eventsource.onerror= (error)=>{
      eventsource.close();
     }
  
     return ()=>{
      eventsource.close();
     }
     }
  
    },[youtube_link])

  

 //    const handlePolylinesReady = useCallback((polylines: google.maps.Polyline) => {
 //     polylinesRef.current.push(polylines);
 //      console.log(polylinesRef.current[0])
 // }, []);



   function change_color(){

      const marker = markersRef.current[0][0];
        const newPin = new google.maps.marker.PinElement({
          scale: 0.7,
          background: "#808080", // 클릭하면 파란색으로
          borderColor: "#230302",
          glyphColor: "#fffffd",
          glyph: 'T',
    
        });
        marker.content = newPin.element; 
        // 핀의 색을 변하게 하고 싶기때문에 새로운 핀을 생성해서 바꾼다는 그뜻??? 인듯.. ref 으로 수정하는대신.. 그냥 change


        polylinesRef.current[0].setOptions({ strokeColor: '#808080' });
   }


  function Make_Marker(place:Place[] ){

  const map= useMap();
  let newMarkers:any[]=[]
  place.forEach((p) => {

    const pin = new google.maps.marker.PinElement({
      background: "#ff0000",
      glyphColor: "#fff",
    });

    const marker = new google.maps.marker.AdvancedMarkerElement({
      map,
      position: p.location,
      content: pin.element,
    });

    newMarkers.push(marker);
  });

  markersRef.current.push(newMarkers);

  }






   const API_KEY = 'AIzaSyBkXahoUxLe2LROntj84Lra95YI-BXqunc';
  return (
      <div className=" flex-[5]   rounded-lg">
        
      <button 
        className=' bg-pink-500'
      onClick={()=>change_color()}> 회색 변하게 해보자 </button>


     <APIProvider 
     apiKey={API_KEY}>
       <Map
         mapId='c6ee764519ee05b0d0b9fec4'
         colorScheme='LIGHT'
         defaultCenter={{lat: 35.68, lng: 139.69}}
     defaultZoom={10}
     gestureHandling={'greedy'}
     fullscreenControl={false}
       >
        <Direction comment={comment}  polylinesRef={polylinesRef}
        ></Direction>
       </Map>
     </APIProvider>
     </div>
  )
}



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