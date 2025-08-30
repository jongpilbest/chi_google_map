import React from 'react'
import { useDispatch } from 'react-redux';
import { change_video_chapter } from '@/app/Redux/store';

type HistoryListProps = {
  nzmd: string;
  timeline: number;
  index: number
};



export default function History_list({nzmd, timeline,index}:HistoryListProps) {

 const dispatch = useDispatch();
 
  const change_video= function(arr:number){
     dispatch(change_video_chapter(arr))
  }

  const chnage_number= function( arr:number){
   let minuute= Math.floor(arr/60);
     let second= (arr%60).toFixed(0);
     return `${minuute}:${second}`
  }


  return (
   <div 
    onClick={()=>change_video(timeline)}
   className="  flex-1  h-[80%] bg-gray-100 mx-1 px-5 flex gap-5 items-center justify-between ">
    <p className='text-xs'>{index}</p>
 <p className='text-xs font-bold font-sans  truncate '> {nzmd}  </p>
      <button
     
      style={{ backgroundColor: '#A29BFE' }}
      className=' rounded-sm px-2 '> <p className=' text-white  text-sm'> {chnage_number(timeline)}</p></button>
    </div>
  )
}
