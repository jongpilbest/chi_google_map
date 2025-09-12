import React from 'react'
import Image from 'next/image'
import Image_1 from '../../image/1847636.jpg'
import Image_2 from '../../image/1850806.jpg'
import Image_3 from '../../image/1853308.jpg' 
import { IoSearchSharp } from "react-icons/io5";

import { useDispatch } from 'react-redux'
import {filter_data_location} from '../../Redux/store'

export default function FInd_list_inner({store,key,index}) {
const dispatch= useDispatch()

// onclick 하면 줌 그쪽으로 가게 해봐 

const google_map_zoom_in= function(){
 
  dispatch(filter_data_location({
      "name":store.googleplace
  }))

}

  return (

  
        <div 
          key={`${store.googleplace ?? "no-place"}-${index}`}
        className=' group relative w-[350px]  shrink-0 h-full bg-gray-100  gap-2  '>
                 
                <div className="absolute
              
                  p-4
                  inset-0
                  bg-black/50 w-[100%] overflow-y-auto text-white text-xs rounded">
                     <div className='flex justify-between items-center'>
                      <p className='text-sm mb-2 font-semibold '>{store.googleplace}</p>
                      <button 
                      onClick={()=>google_map_zoom_in()}
                      className='bg-[#F08AF4] 
                      hover:bg-[#A29BFE]
                      px-2 flex items-center gap-2 rounded-2xl'>
 <IoSearchSharp className='text-xs'></IoSearchSharp>
 <p className='text-xs'> Find </p>
                      </button>
                     
                     </div>
              
                        <div className='py-4'>
                        <p className='text-xs'>{store.instruction}</p>
                      
                      </div>
             
                 </div>

         <div className='flex-[1] h-[100%]  bg-white'>
      
         </div>
         
        </div>
  
  )
}


//<div className='flex-[1] h-[85%]  bg-white'>
//            <Image  className='h-full' src={Image_2} ></Image>
//         </div>
//         <div className='flex-[1] h-[85%]  bg-white'>
//            <Image   className='h-full'  src={Image_3}></Image>
//         </div>
