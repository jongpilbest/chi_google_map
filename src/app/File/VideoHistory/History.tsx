import React from 'react'
import { FaVideo } from "react-icons/fa";


import History_list from './History_list';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import {Place} from '../Map/MapType'

import{http_connect} from '../api_call/fetch'

export default function History() {
  
 const youtube_link = useSelector((state: any) => state.url.url);
     const [place, setplace]= useState<Place[]>([]);
// 그럼 여기에 스피너를 돌려야되는데.. 이게 그 데이터 주면 그때부터 돌아가는거 할려면.. 뭔가 음...
const fetchData = async (youtube_link:string) => {
  const output_data = await http_connect('http://localhost:8000/timeline', youtube_link, "POST")
  console.log(output_data,'데이터요')
  setplace(output_data.message)
}

useEffect(()=>{
     if(youtube_link){
        fetchData(youtube_link)
     }
   

    },[youtube_link])


  return (
   <div 
    
   className="w-full   bg-white rounded-lg flex-[0.7] flex">
      <div className="w-12 bg-white h-full flex items-center  justify-center rounded-md ">
         <FaVideo className="text-gray-500 "></FaVideo>
      </div>
      <div className=' w-[100%] flex items-center justify-center overflow-x-auto '> 

        
        <div className='min-w-[100%]  h-[100%] flex items-center overflow-x-auto '  >
   {
    place&&
    place.map((el,index)=>{
       return <History_list 
       index={index}
       key={el.startTime}
       nzmd={el.googlePlace} timeline={el.startTime} ></History_list>
    })
   }
        </div>
    


      
      </div>

    </div>
  )
}


