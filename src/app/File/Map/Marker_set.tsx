import React, { useMemo } from 'react'
import { Make_Marker } from './Make_Marker'
import { useSelector } from 'react-redux'

import {Place} from './MapType'


const color:string[]= ['A29BFE','#A29BFE','#F08AF4','#F08AF4']

export default function Marker_set({ comment }: any) {
  
  const current_index = useSelector((state: any) => state.url.url_current_index)+1


  // useMemo로 Marker 계산 (comment나 current_index 바뀔 때만 새로 계산)
  const markers = useMemo(() => {
    return comment.flatMap((group: Place[], i: number) => {
      let colorCode: [string, number] = ['', 0]
      
      if (i === 0) colorCode = ['#FFD166', 1]
      else if (i > 0 && i < current_index) colorCode = ['#808080', 0.4]
      else if (i=== current_index ) colorCode = [color[i], 1]
      else if (comment.length-1 > current_index && i > current_index)
        colorCode = ['#808080', 0.4]

      return group.map((el, index) => (
        <Make_Marker
          key={el.id + '_' + i + '_' + index}
          describe={el.describe}
          index={index}
          id={el.id}
          location={el.location}
          color={colorCode[0]}
          opacity={colorCode[1]}
        />
      ))
    })
  }, [comment, current_index])

  return <>{markers}</>
}
