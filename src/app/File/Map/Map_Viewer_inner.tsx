import React, { useState } from "react";
import { LuMapPinned } from "react-icons/lu";
import { BiSolidDownArrow } from "react-icons/bi";
import{personal_color_place} from '../../Redux/store'
import { useDispatch, useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";

export default function Map_Viewer_inner({id_key}) {
  const dispatch= useDispatch();

const { color_location } = useSelector((state: any) => state.data_store);

  const [selected, setSelected] = useState<boolean>(false); // 선택된 날짜

  const days = [
    1,
    2,
    3,
    4,
  ];

  return (
    <>
     
       <div
  onClick={() => setSelected((el) => !el)}
  className={`py-1.5 w-full px-2 rounded-md flex gap-2 items-center justify-between 
    ${color_location.hasOwnProperty(id_key)
      ? "bg-gray-200"
      : "bg-[#47D6A2]"
    }`}
>
  <div className="flex gap-2 items-center">
    <LuMapPinned
      className={color_location.hasOwnProperty(id_key) ? "text-black" : "text-white"}
    />
    <p
      className={`relative ${
        color_location.hasOwnProperty(id_key)
          ? "text-black"
          : "text-white"
      }`}
    >
      {color_location.hasOwnProperty(id_key)
        ? `${color_location[id_key]}일에 추가됨`
        : "여행에 추가하기"}
    </p>
  </div>

  <BiSolidDownArrow
    className={color_location.hasOwnProperty(id_key) ? "text-black" : "text-white"}
  />
</div>
  {selected&&
    <div  className="relative ">


        <div
         className="
    absolute 
    flex flex-col
    bg-white 
  w-full
    shadow-md 
    rounded-xl 
    
    z-[1000] 
    mt-1.5
  "
        >
          {days.map((day,index) => (
            <div
              key={day}
            
              onClick={(e) => {
                e.preventDefault();
                dispatch(personal_color_place({
                  key:id_key ,
                  index:index+1}))
               
              }}
              className="w-full h-8 bg-white flex items-center hover:bg-gray-300  flex  justify-between p-2 "
            >
              <p className="font-bold text-md ">Day {day}</p>
              {color_location.hasOwnProperty(id_key) && color_location[id_key] === day &&<FaCheck className=" text-md text-green-500"></FaCheck> }
            </div>
          
          ))}
         
        </div>
      
    </div>
}
        </>
  );
}
