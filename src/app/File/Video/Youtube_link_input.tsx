import React, { useRef } from 'react';
import { IoIosSend } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { url_plus, data_Store_change } from '@/app/Redux/store';

let check_list: string[] = [];

export function extractVideoId(url: string): string | null {
  const regex = /(?:v=|\/)([0-9A-Za-z_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export default function Youtube_link_input() {
  const dispatch = useDispatch();
  const url_youtube = useRef<HTMLInputElement | null>(null);
// const handleSubmit = async () => {
//    if (!url_youtube.current) return;
//
//    const link = url_youtube.current.value;
//
//    if (!check_list.includes(link)) {
//      check_list.push(link);
//      dispatch(url_plus(link));
//
//      const eventsource = new EventSource(
//        `http://localhost:8000/script?video_url=${encodeURIComponent(link)}`
//      );
//
//      eventsource.onmessage = (event) => {
//        const comment_data = JSON.parse(event.data);
//
//        dispatch(
//          data_Store_change({
//            index: 2,
//            data: comment_data,
//          })
//        );
//      };
//
//      eventsource.onerror = (error) => {
//        eventsource.close();
//      };
//    } else {
//      console.log("이미 추가된 링크입니다.");
//    }
//  };

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
 
       dispatch(
         data_Store_change({
           index: 2,
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
    <div className="flex items-center rounded-lg">
      <input
        ref={url_youtube}
        placeholder="Please enter a YouTube link"
        className="text-sm h-6 px-9 text-gray-800 bg-white"
      />
      <button className="bg-white" onClick={handleSubmit}>
        <IoIosSend className="text-gray-500" />
      </button>
    </div>
  );
}
