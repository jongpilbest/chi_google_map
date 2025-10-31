import React, { useEffect } from 'react'
import { FaHeart } from 'react-icons/fa'
import WatchVideo from './Watch_video'
import { LuMapPin } from 'react-icons/lu'
import Image from 'next/image'
import { useDispatch,useSelector } from 'react-redux'
import { map_click_toggle ,personal_like_place ,InnerComponent_zoom_in} from '../Redux/store'
import { RiFindReplaceLine } from "react-icons/ri";

export default function Inner_compont({data,index}) {

    const dispatch= useDispatch()
   const { like_location } = useSelector((state) => state.data_store);

 

  return (
  
          <div className='h-23  shadow-md gap-2 bg-gray-100 my-4 rounded-md flex items-center p-2 flex-row '>
            <div className='w-[40%] h-full '>
                <Image
                alt={data.googlePlace}
                width={300}
                height={300} 
                className='h-[100%] w-[100%] rounded-md'
                src={data.image}></Image>
          </div>
          <div className='  w-[60%] h-full px-2 flex flex-col justify-around '> 
            <header className='flex justify-between '>
                 <p className='text-xs font-semibold truncate'>{data.emozi} {data.googlePlace}</p>
                 <button 
                 onClick={()=>dispatch(personal_like_place({key:data.id, location:[data.location.lat, data.location.lng]}))}
                 className='l'>
                  <FaHeart className={`${like_location.hasOwnProperty(data.id)?'text-[#F08AF4]':'text-gray-500'} text-xs`}></FaHeart> </button>
            </header>
  
            <div className='flex w-full  justify-between '>
              <button
              onClick={()=>{dispatch(map_click_toggle(data.id))
             dispatch(InnerComponent_zoom_in([
    {
      location: {
        lat: data.location.lat,
        lng: data.location.lng,
      },
    },
  ]))

              }}
              className='hover:bg-green-300 bg-green-200 rounded-md h-6 w-[45%] px-2 flex items-center gap-3   '>
                 <RiFindReplaceLine></RiFindReplaceLine>
                 <p className='text-xs  '>Find</p>
              </button>
          
              <button 
              onClick={()=>dispatch(map_click_toggle(data.id))}
              className='hover:bg-gray-200 bg-white rounded-md h-6 w-[45%] px-2 flex items-center gap-3 '>
                <LuMapPin></LuMapPin>
                <p className='text-xs  '>Map</p>
              </button>
            </div>
        
  
          </div>
        
              </div>
          
       
  )
}