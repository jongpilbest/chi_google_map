import React, { useMemo } from 'react'
import { useState } from 'react';
import {

  InfoWindow,
  useAdvancedMarkerRef,

} from "@vis.gl/react-google-maps";
import { IoMdPin } from "react-icons/io";
import { FaRobot } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";
import { toggleMark} from '@/app/Redux/store';


import { useDispatch,useSelector } from 'react-redux';
import {Place} from './MapType'
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
        console.log(id)

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

          <InfoWindow
            anchor={marker}
            minWidth={200}
            maxWidth={350}
            headerDisabled={true}>
              <div className='p-2'> 
                 <div className=' flex gap-4 items-center py-2 w-full justify-between' > 
                   <div className="flex gap-4">
                      <FaRobot className=' text-lg  text-[#A29BFE]'></FaRobot> 
      
                 <p className='text-sm font-medium text-gray-700'> From the Video</p>
                    </div> 

                    <div className='flex gap-2'>


                       {
                        Mark_Pin_set.length>0 && Maek_pin
                       }      
              
      
                 <MdOutlineCancel  
                 className='text-lg hover:text-[#4DD599]'
                 onClick={handleMarkerClick} />

                    </div>
         

                 </div>
                 <hr className='border-t-1 border-gray-200'></hr>
                 <div className='py-2'> 
                    {
                        describe &&    <p>{describe}</p>
                    }
                 </div>
                
                  </div>
         
                 <gmp-place-details>
                <gmp-place-details-place-request
                  place={id ?? ''}></gmp-place-details-place-request>
                <gmp-place-all-content></gmp-place-all-content>
              </gmp-place-details>
            
          </InfoWindow>
        
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