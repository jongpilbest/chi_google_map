import React, { useRef } from 'react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

import { useDispatch,useSelector } from 'react-redux';
import { url_plus, url_out } from '@/app/Redux/store';
import Youtube_link_input from './Youtube_link_input'

export default function Controll() {
 const dispatch = useDispatch();

 const check_list = useSelector((state:any) => state.url.url_list);

 const url_current_index=  useSelector((state:any) => state.url.url_current_index);



  const url_index_change= function(name:string){

   if(name=="up"){
    if(url_current_index+1<=check_list.length)
    dispatch(url_out({
      "up":true,
      "down":false
    }))
   }
   else{
    if(url_current_index-1>=0)
      dispatch(url_out({
      "up":false,
      "down":true
    }))
   }

  }

  return (
    <div className="h-10 flex gap-7 items-center justify-end">
      <button
      onClick={()=>url_index_change("down")}
        className="w-5 h-5 rounded-4xl flex items-center justify-center bg-gray-500 hover:bg-[#A29BFE]"
    
      >
        <SlArrowLeft className="text-white h-2 " />
      </button>

      <button
      onClick={()=>url_index_change("up")}
        className="w-5 h-5 rounded-4xl flex items-center justify-center bg-gray-500 hover:bg-[#A29BFE]"
      
      >
        <SlArrowRight className="text-white h-2" />
      </button>

      <Youtube_link_input></Youtube_link_input>
    </div>
  );
}
