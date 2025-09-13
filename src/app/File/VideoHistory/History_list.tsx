import React from 'react'
import { useDispatch } from 'react-redux';
import { change_video_chapter } from '@/app/Redux/store';
import { filter_data_location } from '@/app/Redux/store';
type HistoryListProps = {
  nzmd: string | undefined;
  emozi: string | any;
  index: number;
  timeline: number |any;
  image: string[] | any;
};

import Image from 'next/image';

export default function History_list({nzmd,timeline ,emozi,image}:HistoryListProps) {

 const dispatch = useDispatch();
 
  const change_video= function(arr:number){
     dispatch(change_video_chapter(arr))
      dispatch(filter_data_location({"name":nzmd}))
  }

  


  return (
 <div 
    onClick={() => change_video(timeline)}
    className="relative group flex-1 h-[80%] bg-gray-100 mx-1 px-3   flex gap-5 items-center justify-between"
  >
    {/* hover 하면 이미지가 absolute로 나타남 */}
    <div className="absolute  h-[100%] w-full hidden group-hover:block ">
   
      <Image 
        alt="리스트의 이미지"
        src={image} 
        width={140}
        height={20}
        className="rounded-md shadow-lg"
      />
    </div>

    {/* 텍스트 + 이모지 한 줄 */}
    <p className="text-xs font-bold font-sans whitespace-nowrap">
      {nzmd}
    </p>
    <p className="whitespace-nowrap text-lg">{emozi}</p>
  </div>


  )
}

//<Image 
//        alt="리스트의 이미지"
//        src={image[0]} 
//        width={120} 
//        height={80}
//        className="rounded-md shadow-lg"
//      />



// <Image 
//        alt="리스트의 이미지"
//        src={image[0]} 
//        width={140}
//        height={20}
//        className="rounded-md shadow-lg"
//      />