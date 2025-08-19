import React, { useRef, useState } from 'react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { IoIosSend } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { write_new_url, Loading_state } from '@/app/Redux/store';
import OpenAI from "openai";
import { NextResponse } from "next/server";




export default function Controll() {
 const dispatch = useDispatch();
 const url_youtube= useRef<HTMLInputElement>(null);
 
// const openai = new OpenAI({
// // apiKey: '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'
//});

  const handleSubmit = async () => {
    dispatch(write_new_url(url_youtube.current?.value))


   try {
     console.log(url_youtube.current?.value,'경로란?')
     if( url_youtube.current?.value){
    
        //  console.log(result,'제대로 다운이 돴는지 확인해봐 ')
         //dispatch(Loading_state(true))
         //const backend_process=  Fetch_post("http://localhost:8000/process-video",url_youtube.current?.value);
         //const processResult = await backend_process;
         //dispatch(Loading_state(processResult.message));

          // 현재 여기서 실행해서 정보를 받는게 별로임. 구글 있는 곳에서 url 클릭할때마다 sse 실행하게 useEffect 를 사용하라고 함


          

       



          //이거 경로 버튼 누르면 바뀌는걸로 하면될거 같은데 그러면 경로를 또 따로 저장해놔야될듯
        // url_youtube.current.value = '';
 
  
     }
      

   //  const res = await fetch("/api/transcript", {
   //  method: "POST",
   //  headers: { "Content-Type": "application/json" },
   //  body: JSON.stringify({ videoId: url_youtube.current?.value }),
   //});
   // const data = await res.json();
//
//
   //    const chatCompletion = await openai.chat.completions.create({
   //   model: "gpt-4", // 또는 "gpt-3.5-turbo"
   //   messages: [
   //     { role: "system", content: "You are a helpful assistant." },
   //     { role: "user", content: data },
   //   ],
   // });


   }
   catch(error:any){
    return 
   }
    
  

    // 1. redux 에 값을 저장해야지 video componet 에서 변경이 가능
    // 2. 링크 -> youtube script 을 선언해서 대본을 불러옴
    // 3. 대본 -> chatgpt 을 사용해서 요약 / =>  reudx 에 다시 저장 해서 map 으로 전달


  };

  return (
    <div className="h-10 flex gap-7 items-center justify-end">
      <button
        className="w-6 h-6 rounded-4xl flex items-center justify-center"
        style={{ backgroundColor: '#7B7AE7' }}
      >
        <SlArrowLeft className="text-white h-3" />
      </button>

      <button
        className="w-6 h-6 rounded-4xl flex items-center justify-center"
        style={{ backgroundColor: '#9C6CFE' }}
      >
        <SlArrowRight className="text-white h-3" />
      </button>

      <div className="flex items-center rounded-lg">
        <input
          
          ref={url_youtube}
          placeholder="Please enter a YouTube link"
          className="text-sm h-6 px-9 text-gray-800 bg-white"
        />
        <button className="bg-white" onClick={handleSubmit}>
          <IoIosSend className="text-gray-400" />
        </button>
      </div>
    </div>
  );
}
