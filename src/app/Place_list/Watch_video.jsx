import React from 'react'
import { IoVideocamSharp } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import {  url_out,change_video_chapter} from '@/app/Redux/store';

export default function Watch_video({index,startTime}) {


    const dispatch= useDispatch()


  return (
     <div 
          onClick={()=> {
               // 동영상 바꾸는거 
               // 동영상 타임라인 맞추기 
        
       dispatch(url_out(index))
       dispatch(change_video_chapter(startTime))
   
           }}
         className="flex  bg-green-100 items-center rounded-md px-2 hover:bg-green-300 h-6 ">
          
   
           <button
          
           className='rounded-md text-xs px-1 py-1 font-m flex items-center gap-3 '> 
               <IoVideocamSharp></IoVideocamSharp>
           <p>View</p>
            </button>
   
         </div>
  )
}
