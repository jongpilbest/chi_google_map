import React, { useMemo } from 'react'
import { Make_Marker } from './Make_Marker'
import { useSelector } from 'react-redux'

import {Place} from './MapType'




export default function Marker_set({ comment }: any) {
  
const { like_location, clicked_marker_id,color_location } = useSelector((state: any) => state.data_store);


  // useMemo로 Marker 계산 (comment나 current_index 바뀔 때만 새로 계산)
  const markers = useMemo(() => {
   return  Object.values(comment).map((El)=>{ // 기본 색상
  let colorCode: [string, number] = [null, 1]; 
  const el= El[0][0]


  // ✅ 조건문은 JSX 밖에서 처리
 
   if(like_location.hasOwnProperty(el.id)){
    if(color_location.hasOwnProperty(el.id)){
      colorCode = [color_location[el.id], 1];
    }
    else{
       colorCode = ['pink', 1];
    }
 
  }

  else if (el.id === clicked_marker_id) {
    colorCode = ['purple', 1];
  } 
  return (
    <Make_Marker
      key={`${el.id}__${el.index}`}
    
      id={el.id}
    
      emozi={el.emozi}
      location={el.location}
   
      color={colorCode[0]}
      opacity={colorCode[1]}
    />
  );
     
    })
  }, [comment, clicked_marker_id,like_location,color_location])

  return <>{markers}</>
}
