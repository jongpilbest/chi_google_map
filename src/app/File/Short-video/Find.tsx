import React from 'react'
import Generate from './Generate'
import Find_inner from './FInd_list_inner'
import { useState } from 'react'
import { http_connect } from '../api_call/fetch'
import { useMutation } from "@tanstack/react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";



export default function Find({name}) {

 // 여기서 그냥 함수를 불러오는걸로하고 ..
// 결과를 Find_inner 으로 주기로 하자 

    const mutation = useMutation({
  mutationFn: async (text: any) => {
    const res = await fetch("/api/find_location", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ video_url: text.value ,
        country:name
      }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    // 🔥 여기서 JSON 변환
    const data = await res.json();
    return data;
  },
});





const send_text= async function(text:any){

 mutation.mutate(text);

// 이미지랑 그걸 여기에 받아서 뭘 어쩔겨... --> 이거 받았으니.. 이미지 + 내용 제공해주기 
}


  return (
 <div className="w-full flex-[1.3] gap-x-4 flex rounded-lg   h-40    ">
       <Generate send_text={send_text}></Generate>
      <div className="flex-[4] bg-white rounded-xl flex gap-4 p-3 flex-row overflow-x-auto  ">
        
              {mutation.isPending && <AiOutlineLoading3Quarters className="animate-spin text-2xl text-[#A29BFE]"/>}

        { mutation.isSuccess&&
          Array.isArray(mutation.data)&&mutation.data.length>0 && mutation.data.map((el,index:any)=><Find_inner 
          key={el.googlePlace}
          index={index}
          store={el}></Find_inner>)
        }
         {
          mutation.isSuccess&&mutation.data.length==0 &&<p> 검색 결과가 없습니다</p>
         }
      </div>
    </div>
  )
}


