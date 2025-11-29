import React, { useRef } from 'react';
import { IoIosSend } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { url_plus, data_Store_change } from '@/app/Redux/store';
import { CiSearch } from "react-icons/ci";
let check_list: string[] = [];

export function extractVideoId(url: string): string | null {
  const regex = /(?:v=|\/)([0-9A-Za-z_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export default function Youtube_link_input({children}) {
  const dispatch = useDispatch();
  const url_youtube = useRef<HTMLInputElement | null>(null);
 // const handleSubmit = async () => {
 //  if (!url_youtube.current) return;
 //  const link = url_youtube.current.value;
 //  if (!check_list.includes(link)) {
 //    check_list.push(link);
 //    dispatch(url_plus(link));
 //    const eventsource = new EventSource(
 //      `http://localhost:8000/script?video_url=${encodeURIComponent(link)}`
 //    );
 //    eventsource.onmessage = (event) => {
 //      const comment_data = JSON.parse(event.data);
 //    //  dispatch(
 //    //    data_Store_change({
 //    //      index: 2,
 //    //      data: comment_data,
 //    //    })
 //    //  );
 //    };
 //    eventsource.onerror = (error) => {
 //      eventsource.close();
 //    };
 //  } else {
 //    console.log("이미 추가된 링크입니다.");
 //  }
 //};
// 배포용

  const handleSubmit = async () => {
    if (!url_youtube.current) return;

    const link = extractVideoId(url_youtube.current.value);

    if (link&& !check_list.includes(link)) {
      check_list.push(link);
      dispatch(url_plus(link));

       
  

      // 여기 배포 할때만

     try {
       const res = await fetch(`/Data/${link}/summary.json`);
       const comment_data = await res.json(); // 바로 JSON 파싱
       // 데이터 넣을때 data_store_change에 넣음 

       dispatch(
         data_Store_change({
           index:check_list.length-1 ,
           data: comment_data,
         })
       );
    } catch (err) {
   console.error("❌ JSON 불러오기 실패:", err);
     }
    
      
    } else {
      console.log("이미 추가된 링크입니다.");
    }
  };

  return (
<div className="flex items-center justify-between w-full gap-10 bg-white  rounded-2xl   border-gray-200">
  {/* 입력창 */}
  <div className="flex items-center flex-1 bg-gray-100  shadow rounded-md px-3 py-1">
    <input 
      ref={url_youtube}
      placeholder="Please enter a YouTube link"
      className="text-xs h-6 px-2 w-full text-gray-800  bg-transparent outline-none placeholder-gray-400"
    />
    <button
      onClick={handleSubmit}
      className=" text-white w-5 h-5 flex justify-center items-center  hover:text-green-700 transition-colors bg-[#47D6A2] rounded-md"
    >
      <CiSearch className="text-sm " />
    </button>
   
  </div>
    {children}

</div>

  );
}
