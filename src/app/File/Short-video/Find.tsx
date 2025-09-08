import React from 'react'
import Generate from './Generate'
import Find_inner from './FInd_list_inner'
import { useState } from 'react'
import { http_connect } from '../api_call/fetch'
import { useMutation } from "@tanstack/react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";



export default function Find() {

 // 여기서 그냥 함수를 불러오는걸로하고 ..
// 결과를 Find_inner 으로 주기로 하자 
const[store_list,setstore_list]=useState([
   
    
  ])

    const mutation = useMutation({
    mutationFn: (text: any) =>
      http_connect("http://localhost:8000/find_location", text.value, "POST"),
  });



const send_text= async function(text:any){

 mutation.mutate(text);

// 이미지랑 그걸 여기에 받아서 뭘 어쩔겨... --> 이거 받았으니.. 이미지 + 내용 제공해주기 
}


  return (
 <div className="w-full flex-[1.4] gap-x-4 flex rounded-lg   h-40    ">
       <Generate send_text={send_text}></Generate>
      <div className="flex-[4] bg-white rounded-xl flex gap-4 p-4 flex-row overflow-x-auto  ">
        
              {mutation.isPending && <AiOutlineLoading3Quarters className="animate-spin text-2xl text-[#A29BFE]"/>}

        { mutation.isSuccess&&
          Array.isArray(mutation.data)&&mutation.data.length>0 && mutation.data.map((el:any)=><Find_inner 
          key={el.googlePlace}
          store={el}></Find_inner>)
        }
         
      </div>
    </div>
  )
}


