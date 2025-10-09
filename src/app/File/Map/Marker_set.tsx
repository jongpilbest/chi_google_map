import React, { useMemo } from 'react'
import { Make_Marker } from './Make_Marker'
import { useSelector } from 'react-redux'

import {Place} from './MapType'




export default function Marker_set({ comment }: any) {
  
const { map_click, clicked_marker_id } = useSelector((state: any) => state.data_store);

  // useMemo로 Marker 계산 (comment나 current_index 바뀔 때만 새로 계산)
  const markers = useMemo(() => {
   return  Object.values(comment).map((El)=>{ // 기본 색상
  let colorCode: [string, number] = [null, 1]; 
  const el= El[0][0]


  // ✅ 조건문은 JSX 밖에서 처리
  if (el.id === clicked_marker_id) {
    colorCode = ['#F08AF4', 1];
  }
  return (
    <Make_Marker
      key={`${el.id}__${el.index}`}
      describe={el.describe}
      index={el.index}
      id={el.id}
      startTime={el.startTime}
      emozi={el.emozi}
      location={el.location}
      category={el.category}
      color={colorCode[0]}
      opacity={colorCode[1]}
    />
  );
     
    })
  }, [comment, clicked_marker_id])

  return <>{markers}</>
}
