import React from 'react'

import { MdOutlineCheckCircle } from "react-icons/md";






import { useDispatch } from 'react-redux';
import { change_selected_mark , change_check_Check,clearDirection} from '@/app/Redux/store';




import { useSelector } from 'react-redux';

const colors = ["bg-red-300", "bg-orange-300", "bg-yellow-300","bg-green-300"];
export default function Map_Contorller() {

 
 /// circle 이랑 cancel 은 pin 이 활성화 되고 있을때만 작동하게 만들어주세요 
 // redux 내부에서 작동할때도 .. 그렇게 해애됨 ... ==> 이거 예외처리 프론트에 줘야되나 ..
 const dispatch = useDispatch();
  

  const check_check_confirm= useSelector((state: any) => state.contorller.Check_check);
  const click_route= useSelector((state:any)=>state.contorller.select_mark_index)
   // 이거 우선은 배열안에 new set 으로 만들어야되나? 


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
     <div    className={`
    w-12 p-2 flex-none
    ${check_check_confirm ? "h-50" : "h-20"}
    bg-white rounded-lg flex flex-col justify-around items-center
  `}
  >
   
     <MdOutlineCheckCircle  onClick={()=> click_method("Check")} className={` ${
    check_check_confirm ? "text-[#4DD599]" : "text-gray-500"
  } text-lg hover:text-[#4DD599]`} />

{check_check_confirm && colors.map((el, index) => (
  <button 
  onClick={()=> {}}
    key={index}
    className={`rounded-2xl w-3.5  h-3.5 ${click_route==index?el:'bg-gray-500'}`}
  >
 
  </button>
))}

         
    

       </div>
  )
}



//  <LuMapPinPlus 
     //           onClick={()=>add_Selected_mark}
     //           className='text-lg hover:text-[#4DD599]'></LuMapPinPlus>


  //onClick={()=> /*dispatch(change_selected_mark(index))*/}
     //