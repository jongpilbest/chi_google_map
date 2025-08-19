

import { useEffect ,useState, useRef} from "react";

import {
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";




interface Prop{
   comment: string[];
  polylinesRef:React.MutableRefObject<google.maps.Polyline[]>;
}


export default function Direction({ comment,polylinesRef}:Prop ){
   const [DirectionService, setDirectionService] = useState<google.maps.DirectionsService>();
  const [Directionrender,setDirectionRender]=useState<google.maps.DirectionsRenderer>();

   const map= useMap();
   const routeLibrary= useMapsLibrary('routes')
   

  function splitWaypointsIntoSegments(waypoints:string[], maxWaypointsPerRequest:number) {
  var segments = [];
  for (var i = 0; i < waypoints.length; i += maxWaypointsPerRequest - 1) {
    var segment = waypoints.slice(i, Math.min(i + maxWaypointsPerRequest, waypoints.length));
    if (segment.length > 1) segments.push(segment);
  }
  return segments;
   }

  const segments = splitWaypointsIntoSegments(comment, 10); 
  




   useEffect(()=>{
   if(!map || !routeLibrary) return
    setDirectionService(new routeLibrary.DirectionsService())
    setDirectionRender( new routeLibrary.DirectionsRenderer({map}));
   },[map,routeLibrary])


   useEffect(()=>{
    if(!DirectionService || !Directionrender) return

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
      origin: segment[0],
      destination: segment[segment.length - 1],
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.WALKING,
    });
  })
)
  .then((responses) => {
    let fullPath:any[] = [];
    responses.forEach((res) => {
      fullPath = fullPath.concat(res.routes[0].overview_path);
    });

    const polyline = new google.maps.Polyline({
      path: fullPath,
      map: Directionrender.getMap(),
      strokeColor: '#ff0000',
      strokeOpacity: 0.5,
      strokeWeight: 5,
    });

    // 여기에 ref 넣어주세요 이런 느낌으로???/???/
    // polylinesRef=(polyline)


  })
  .catch((err) => console.error("Directions failed:", err));
   },[DirectionService,Directionrender,commen])


   return null;
}

