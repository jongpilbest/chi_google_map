

import { useEffect ,useState, useRef} from "react";
import React from "react";
import {
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";

import {Place} from './MapType'


interface Prop{
   comment: Place[];
  polylinesRef:React.MutableRefObject<google.maps.Polyline[]> ;
  color?:string ;
  check:boolean
}


function splitWaypointsIntoSegments(waypoints:Place[], maxWaypointsPerRequest:number) {
  var segments = [];
  for (var i = 0; i < waypoints.length; i += maxWaypointsPerRequest - 1) {
    var segment = waypoints.slice(i, Math.min(i + maxWaypointsPerRequest, waypoints.length));
    if (segment.length > 1) segments.push(segment.map((el)=>el.location));
  }
  return segments;
   }


 function Direction({ comment,polylinesRef,color,check}:Prop ){


  const [DirectionService, setDirectionService] = useState<google.maps.DirectionsService>();
  const [Directionrender,setDirectionRender]=useState<google.maps.DirectionsRenderer>();

   const map= useMap();
   const routeLibrary= useMapsLibrary('routes')
  
  const segments = splitWaypointsIntoSegments(comment, 20); 
  
    
   useEffect(()=>{
   if(!map || !routeLibrary) return
    setDirectionService(new routeLibrary.DirectionsService())
    setDirectionRender( new routeLibrary.DirectionsRenderer({map}));
   },[map,routeLibrary])

useEffect(() => {
  if (!DirectionService || !Directionrender) return;
  
  let polyline: google.maps.Polyline | null = null;
  // 여기에 이미 내가 해놨네 
  
  if (polylinesRef.current.length > 0) {
    polylinesRef.current[polylinesRef.current.length - 1].setOptions({
      strokeColor: "#808080",
      strokeOpacity: 0.2,
    });
  }

  Promise.all(
    segments.map((segment) => {
      const waypts = [];
      for (let i = 1; i < segment.length - 1; i++) {
        waypts.push({
          location: segment[i],
          stopover: true,
        });
      }


      return DirectionService.route({
        origin: segment[0]!,
        destination: segment[segment.length - 1]!,
        waypoints: waypts,
        optimizeWaypoints: !check,
        travelMode: google.maps.TravelMode.WALKING,
      });
    })
  )
    .then((responses) => {
      let fullPath: any[] = [];
      responses.forEach((res) => {
        fullPath = fullPath.concat(res.routes[0].overview_path);
      });

      polyline = new google.maps.Polyline({
        path: fullPath,
        map: Directionrender.getMap(),
        strokeColor: color,
        strokeOpacity: 0.8,
        strokeWeight: 5,
      });
    if(check){ polylinesRef.current.push(polyline)}
    })
    .catch((err) => console.error("Directions failed:", err));

  // ✅ useEffect cleanup
  return () => {
    if (polyline&& check==true) {

      polyline.setMap(null); // 자기 자신 polyline만 삭제
      //polylinesRef.current = polylinesRef.current.filter((p) => p !== polyline);
      // 여기 색 다시 설정해야됨 .. setOption 으로 기존으로 되돌려주는 형식 ... 
      // 그 color 셋트의 색을 좀 내가 설정해 놓고 , 우선은 3개라고 가정하고 3개로 만들어 놓고 
      // 그 색으로 다시 돌아가게 햐주는 for 문으로 설정하면 될거같음 어쩌피 ..동영상 많이 할거 아니여서 괜찮음



    }
  };
}, [DirectionService, Directionrender, comment.length]);



   return null;
}

export default React.memo(Direction);