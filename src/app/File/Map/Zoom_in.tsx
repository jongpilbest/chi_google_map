import React from 'react'

import { useEffect } from 'react';
import { useMap , } from '@vis.gl/react-google-maps';

import { useSelector } from 'react-redux';
export default function Zoom_in() {

// usememo 으로 잡아서 여기만 수정해달라고 하기 

const map = useMap();
const place= useSelector((state: any) => state.data_store.zoom_in_place);

  //state.zoom_in_place= filter_data
// 여기 부분에 넣어줘 이때 데이터를 걍 그......쩝 fiter 해달라고 하는게 날거같은데 



  // adjust the viewport of the map when the place is changed
  useEffect(() => {
    if (!map || !place) return;
  
if (place&& place[0].location) {

  map.panTo(place[0].location);
  map.setZoom(17);
   }

  }, [map, place?.[0]?.location]);

  return (
  <></>
  )
}
