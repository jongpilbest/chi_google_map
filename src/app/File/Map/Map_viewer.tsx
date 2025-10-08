import React, { useMemo } from 'react'
import { useState } from 'react';
import {

  InfoWindow,
  ControlPosition,
MapControl
} from "@vis.gl/react-google-maps";
import { IoMdPin } from "react-icons/io";
import { LuMapPinned } from "react-icons/lu";
import { MdOutlineCancel } from "react-icons/md";
import { toggleMark} from '@/app/Redux/store';
import { IoVideocamOutline } from "react-icons/io5";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useDispatch,useSelector } from 'react-redux';
import { BiSolidDownArrow } from "react-icons/bi";
import {Place} from './MapType'
import { FaHeart } from "react-icons/fa";
type MapViewerProps = Place & {
  handleMarkerClick: () => void; // id를 받아서 void 리턴하는 함수,
  marker: google.maps.marker.AdvancedMarkerElement | null
};


const colors = ["text-red-400", "text-orange-400", "text-yellow-400","text-green-400"];


export default function Map_viewer({id,describe ,handleMarkerClick ,marker}:MapViewerProps  ) {

  


   const Mark_Pin_set = useSelector((state: any) => state.contorller.selectedMark);
   // 이거 우선은 배열안에 new set 으로 만들어야되나? 


   const Maek_pin= useMemo(()=>{
    return Mark_Pin_set.map((set: Set<string>, index: number) => (
    <IoMdPin
      key={index}
      onClick={() =>{
  dispatch(
          toggleMark({
            id: id,
            index: index,
          })
        )
       

      }
      
      }
      className={`text-lg ${
        set.has(id) ? colors[index] : "text-gray-500"
      }`}
    />
  ));
   },[Mark_Pin_set])


  const dispatch= useDispatch()

  return (
    <>
    <MapControl position={ControlPosition.TOP_RIGHT}>
         
             <div
    className="absolute top-0 right-0 h-screen w-[23rem] 
               bg-white/80  shadow-lg overflow-y-auto z-[1000] "
  >    <header className='h-7 p-4  flex-row-reverse flex items-center bg-gray-100'> <p>    <MdOutlineCancel
          className="text-lg hover:text-[#4DD599]"
          onClick={handleMarkerClick}
        /></p></header>

    <div className="flex gap-4 items-center pt-4 pb-1 w-full justify-between px-4">
      <div className="flex gap-2 items-center">
        <div className='p-1 rounded-md bg-[#0E9E86]'>
   <IoVideocamOutline className='text-white'></IoVideocamOutline>
        </div>
    
        <p className="text-sm font-bold text-gray-700">From the Video</p>
      </div>

      <div className="flex gap-5 bg-green-200 items-center rounded-md px-2">
        {/*Mark_Pin_set.length > 0 && Maek_pin*/}

        <button className='rounded-md  px-2 py-1 font-semibold'> Watch Video </button>
    <FaLongArrowAltRight></FaLongArrowAltRight>
      </div>
    </div>



    <div className="py-3 p-4">{describe && <p>{describe}</p>}
    <div className='bg-[#47D6A2] my-3 py-1.5 px-2 rounded-md flex gap-2 items-center justify-between'>
      <div className='flex gap-2 items-center'>
       <LuMapPinned className='text-white'></LuMapPinned>
      <p className='text-white'> 여행에 추가하기 </p>
      </div>
      <BiSolidDownArrow className='text-white '></BiSolidDownArrow>
     

    </div>
    <button className=' bg-gray-200 p-2 rounded-2xl mt-5 flex  '>
 
 <FaHeart className='text-gray-500'></FaHeart>
    </button>
    </div>

    <gmp-place-details>
      <gmp-place-details-place-request place={id ?? ''}></gmp-place-details-place-request>
      <gmp-place-all-content></gmp-place-all-content>
    </gmp-place-details>
  </div>
      
        </MapControl>
            </>
  )
}


declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'gmp-place-details': React.DetailedHTMLProps<
        // @ts-expect-error PlaceDetailsElement not in types yet
        React.HTMLAttributes<google.maps.places.PlaceDetailsElement> & {
          size?: any;
        },
        // @ts-expect-error PlaceDetailsElement not in types yet
        google.maps.places.PlaceDetailsElement
      >;
      'gmp-place-details-compact': React.DetailedHTMLProps<
        // @ts-expect-error PlaceDetailsCompactElement not in types yet
        React.HTMLAttributes<google.maps.places.PlaceDetailsCompactElement> & {
          size?: any;
        },
        // @ts-expect-error PlaceDetailsCompactElement not in types yet
        google.maps.places.PlaceDetailsCompactElement
      >;
      'gmp-place-details-place-request': React.DetailedHTMLProps<
        // @ts-expect-error PlaceDetailsPlaceRequestElement not in types yet
        React.HTMLAttributes<google.maps.places.PlaceDetailsPlaceRequestElement> & {
          place: string;
        },
        // @ts-expect-error PlaceDetailsPlaceRequestElement not in types yet
        google.maps.places.PlaceDetailsPlaceRequestElement
      >;
      'gmp-place-all-content': React.DetailedHTMLProps<
        // @ts-expect-error PlaceAllContentElement not in types yet
        React.HTMLAttributes<google.maps.places.PlaceAllContentElement>,
        // @ts-expect-error PlaceAllContentElement not in types yet
        google.maps.places.PlaceAllContentElement
      >;
    }
  }
}