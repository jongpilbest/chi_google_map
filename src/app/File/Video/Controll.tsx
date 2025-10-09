import React, { Fragment, useRef } from 'react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

import { useDispatch,useSelector } from 'react-redux';
import { url_plus, url_out } from '@/app/Redux/store';
import Youtube_link_input from './Youtube_link_input'
import { LuMapPin } from "react-icons/lu";
export default function Controll() {







  return (
     <header className="w-full h-15 flex  justify-between  items-center px-10 bg-white border-b border-gray-300">
      <div className=' flex items-center flex-1'>
      <div className="  bg-[#0E9E86] p-1 rounded-md">
  <LuMapPin
  className="text-md"
  style={{
            color:'white'
          }}></LuMapPin>
       
          </div>
          <p className="font-sans font-bold text-sm mx-4">Videolens</p> 
          
      </div>
          
    <div className="h-10  flex gap-7 items-center  flex-3" >
           <Youtube_link_input></Youtube_link_input>
      
 
    </div>
        </header>

  );
}

//
//<button
//      onClick={()=>url_index_change("down")}
//        className="w-5 h-5 rounded-4xl flex items-center justify-center bg-gray-500 hover:bg-[#A29BFE]"
//    
//      >
//        <SlArrowLeft className="text-white h-2 " />
//      </button>
//
//      <button
//      onClick={()=>url_index_change("up")}
//        className="w-5 h-5 rounded-4xl flex items-center justify-center bg-gray-500 hover:bg-[#A29BFE]"
//      
//      >
//        <SlArrowRight className="text-white h-2" />
//      </button>
//