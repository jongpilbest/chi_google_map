import React from 'react'
import { FaVideo } from "react-icons/fa";


import History_list from './History_list';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import {Place} from '../Map/MapType'


//음식

import { PiBowlFoodFill } from "react-icons/pi";

//쇼핑

import { PiShoppingCartFill } from "react-icons/pi";


//볼거리

import { PiMapPinLineFill } from "react-icons/pi";







export default function History() {
  
const youtube_link = useSelector((state: any) => state.url.url_current);
const [place, setplace]= useState<Place[]>([]);
const [filter_place,setFilter_place]=useState<Place[]>([]);
const [size,setsize]= useState(false)
const [image_check,setimage_check]=useState(false);

// 그럼 여기에 스피너를 돌려야되는데.. 이게 그 데이터 주면 그때부터 돌아가는거 할려면.. 뭔가 음...
const fetchData = async (youtube_link:string) => {
    


    const res = await fetch(`/Data/${youtube_link}/summary.json`);
    const comment_data = await res.json(); // 바로 JSON 파싱
//
  // 여기부분이 current 뭔지에 따라서 데이터 달라지는거아님?
   setplace(comment_data)
}

const filter_data = function (arr: string | number) {
  if(arr==1 || arr==2){
     setFilter_place(place.filter((el:any)=>el.category=="food"))
     if(arr==2){
      setimage_check(true)
     }
     else setimage_check(false)
     
  }
  else if (arr==3 || arr==4){
     setFilter_place(place.filter((el:any)=>el.category=="shopping"))
     if(arr==4){
      setimage_check(true)
     }
     else setimage_check(false)
     
  }
  else{
      setFilter_place(place.filter((el:any)=>el.category=="sightseeing"))
     if(arr==6){
      setimage_check(true)
     }
     else setimage_check(false)
  }
  }


useEffect(()=>{
     if(youtube_link){
        fetchData(youtube_link)
     }
   

    },[youtube_link])



  return (
   <div 
     className={`
    w-full bg-white rounded-lg 
    flex-[0.9] 
    flex
  
  `} 
   >
      <div className="w-12 bg-white h-full  items-center gap-2  flex  justify-center rounded-md ">
         <FaVideo 
          onClick={() => setsize((prev) => !prev)}
         className="text-gray-500 hover:text-[#4DD599]   "></FaVideo>
     
      </div>
      <div className=' w-[100%] flex items-center justify-center overflow-x-auto '> 

        
        <div className='min-w-[100%]  h-[100%] flex items-center overflow-x-auto '  >
        {
          size && <div className='  w-25 justify-between border rounded-3xl   border-gray-300  p-2 items-center   flex gap-1  '>
         
      
          <PiBowlFoodFill onClick={()=>filter_data(2)} className='text-gray-400 text-xl hover:text-green-300'></PiBowlFoodFill>
      
         
      
           <PiShoppingCartFill onClick={()=>filter_data(4)} className='text-gray-400 text-xl hover:text-green-300'></PiShoppingCartFill>
      
       
          
            <PiMapPinLineFill onClick={()=>filter_data(6)}  className='text-gray-400 text-xl hover:text-green-300'></PiMapPinLineFill>
         
          </div>
        }
  {
    size==true && 
     filter_place.map((el,index)=>{
       return <History_list 
       index={index}
       key={el.startTime}
       image={el.image}
       nzmd={el.googlePlace} 
       timeline={el.startTime}
       emozi={el.emozi} ></History_list>
    })
  }

   {size==false&&
    place.length>0&&
    place.map((el,index)=>{
       return <History_list 
       index={index}
       key={el.startTime}
       nzmd={el.googlePlace} 
       timeline={el.startTime}
       image={el.image}
       emozi={el.emozi} ></History_list>
    })
   }
        </div>
    
    


      
      </div>

    </div>
  )
}


