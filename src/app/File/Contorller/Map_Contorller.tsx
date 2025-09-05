import React from 'react'

import { MdOutlineCheckCircle } from "react-icons/md";

import { MdOutlineCancel } from "react-icons/md";

import { useDispatch } from 'react-redux';
import { change_search_state , change_check_Check,clearDirection} from '@/app/Redux/store';

import { useSelector } from 'react-redux';
export default function Map_Contorller() {
 
 /// circle 이랑 cancel 은 pin 이 활성화 되고 있을때만 작동하게 만들어주세요 
 // redux 내부에서 작동할때도 .. 그렇게 해애됨 ... ==> 이거 예외처리 프론트에 줘야되나 ..
 const dispatch = useDispatch();
  

  const check_check_confirm= useSelector((state: any) => state.contorller.Check_check);
  const check_search= useSelector((state: any) => state.contorller.show_search);
  // 지금 경로가 뭔지? 


 // pin 굳이 안필요 할거 같기도함.. 솔직히 걍 내가 풀면 되는거아님?
 

  function click_method(arr:string){
 
     if(arr=="Check") {
    dispatch(change_check_Check(!check_check_confirm))

    }
    else if (arr=="Cancel") {
         dispatch(clearDirection())
    }
 

 }



  return (
     <div className="w-12 p-2 h-[20%] min-h-[120px] max-h-[300px]  
                bg-white rounded-lg flex flex-col justify-around items-center ">
   
     <MdOutlineCheckCircle  onClick={()=> click_method("Check")} className={` ${
    check_check_confirm ? "text-[#4DD599]" : "text-gray-500"
  } text-lg hover:text-[var(--purple)]`} />
     <MdOutlineCancel onClick={()=> click_method("Cancel")} className="text-gray-500 text-lg hover:text-[#4DD599]" />
    

       </div>
  )
}
