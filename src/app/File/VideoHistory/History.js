import React from 'react'
import { FaVideo } from "react-icons/fa";
import UseHook from '../Use_hook/Hook';
export default function History() {

// 그럼 여기에 스피너를 돌려야되는데.. 이게 그 데이터 주면 그때부터 돌아가는거 할려면.. 뭔가 음...



  return (
   <div className="w-full bg-white  rounded-lg flex-[0.8] flex">
      <div className="w-12 bg-white h-full flex items-center  justify-center rounded-md ">
         <FaVideo className="text-gray-300 "></FaVideo>
      </div>
      <div className=' w-[100%] flex items-center justify-center'> 
        <UseHook ></UseHook>
      </div>

    </div>
  )
}
