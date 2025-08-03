import React from 'react'
import {
  APIProvider,
  Map,
  useMap,
  AdvancedMarker,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
//import type { Marker } from "@googlemaps/markerclusterer";
export default function Mappage() {
    const map= useMap();
   const API_KEY = 'AIzaSyBkXahoUxLe2LROntj84Lra95YI-BXqunc';
  return (
      <div className=" flex-[5] bg-amber-400 rounded-lg">
     <APIProvider 
     apiKey={API_KEY}>
       <Map
         mapId='c6ee764519ee05b0d0b9fec4'
         
         defaultCenter={{lat: 43.65, lng: -79.38}}
     defaultZoom={9}
     gestureHandling={'greedy'}
     fullscreenControl={false}
       >
        
       </Map>
     </APIProvider>
     </div>
  )
}
