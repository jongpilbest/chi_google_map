import React from 'react'
import { useMap } from '@vis.gl/react-google-maps';

import { useEffect } from 'react';

import { useSelector } from 'react-redux';
export default function Border_map() {
  const map = useMap();
  const place= useSelector((state) => state.data_store.locality_place);
  
// adjust the viewport of the map when the place is changed
  useEffect(() => {
    if (!map || !place) return;

     const featureLayer = map.getFeatureLayer('LOCALITY');

      const featureStyleOptions = {
        strokeColor: "#0E9E86",
        strokeOpacity: 1.0,
        strokeWeight: 3.0,
        fillColor: "#47D6A2",
        fillOpacity: 0.5,
      };
      if(place.location!=null){
       map.panTo(place.location);
       map.setZoom(14);
      }
     
      featureLayer.style = (options) => {
        // 특정 지역 placeId로 스타일 지정 (예: Shibuya)
       
        if (options.feature.placeId ===place.place) {
       
          
          return featureStyleOptions;
        }
 
      };
     
  }, [map,place.location]);
 


  return (
    <div></div>
  )
}
