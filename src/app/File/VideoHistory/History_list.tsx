import React from 'react'
import { useDispatch } from 'react-redux';
import { change_video_chapter } from '@/app/Redux/store';
import { filter_data_location } from '@/app/Redux/store';
type HistoryListProps = {
  nzmd: string | undefined;
  emozi: string | any;
  index: number;
  timeline: number |any;
};



export default function History_list({nzmd,timeline ,emozi,index}:HistoryListProps) {

 const dispatch = useDispatch();
 
  const change_video= function(arr:number){
     dispatch(change_video_chapter(arr))
      dispatch(filter_data_location({"name":nzmd}))
  }

  


  return (
 <div 
  onClick={() => change_video(timeline)}
  className="flex-1 h-[80%] bg-gray-100 mx-1 px-5 flex gap-5 items-center justify-between"
>
  {/* index 번호 */}
  <p className="text-xs">{index}</p>

  {/* 텍스트 + 이모지 한 줄 */}
  <p className="text-xs font-bold font-sans  whitespace-nowrap">
    {nzmd}
  </p>
  <p className=' whitespace-nowrap text-xl'> {emozi}</p>
 
 
</div>


  )
}
