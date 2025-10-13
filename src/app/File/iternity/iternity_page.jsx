
'use client'
import React, { use, useRef, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { format, isValid, parse } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { kMeans, runKMeansWithOptimalInertia } from "k-means-clustering-js";
import { Cluster } from "k-means-clustering-js/dist/types";
import Portal from './Portal'
import { isDateRange } from "react-day-picker";

import Drawer from '../../Place_list/Drawer'
 //const tabs = [
 //   { id: "food", label: "Food" },
 //   { id: "adventure", label: "Adventure" },
 //   { id: "shopping", label: "Shopping" },
 // ];



export default function DateRangePicker() {

 const [range, setRange] = useState(isDateRange);


  const [total_travel, settotal_Travel] = useState({
    day:0,
    tabs:[]
  });
  console.log(total_travel.tabs,'뭐지?')

  const [showStartPicker, setShowStartPicker] = useState(false);
  

  // format date text
  const formatDate = (date) => (date ? format(date, "MM/dd/yyyy") : "");
  
  const Travel_Day= function(){
    const startDate = new Date(range.from);
    const endDate = new Date(range.to);
    
    // 2️⃣ 시간 차(밀리초 단위) 계산
    const diffTime = endDate - startDate; // 밀리초(ms)
    
    // 3️⃣ 일(day) 단위로 변환
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
  
    // 여기 객체로 넣는법
    let tabs=[]
    for(var i=0; i<=Number(diffDays); i++){
     tabs.push({
       "id":i+1, "label":`${i+1} Day`
     })
    }
    
    settotal_Travel({
      day:diffDays,
      tabs: tabs})

    Make_travel()
   
  }

  const Make_travel= async function(){
 
const places = [
    [2.37, 5.56],
    [6.12, 1.92],
    [4.72, 3.25],
    [7.82, 8.16],
    [3.64, 6.01],
    [8.29, 2.46],
    [5.63, 9.71],
    [4.88, 6.44],
    [7.33, 7.85],
    [9.56, 1.82],
    [3.93, 9.51],
    [5.79, 7.28],
    [8.06, 2.92],
    [6.63, 8.03],
    [4.25, 4.76],
    [2.89, 7.54],
    [9.24, 6.48],
  ];

  const results = runKMeansWithOptimalInertia({
      data: places,
      k: total_travel.day,
    });
   console.log(results,'결과만 확인')

  }
  function Drawer_change(){

  }



  return (
    <div className="flex-2    gap-4 px-10 py-4 rounded-md w-full max-w-lg">
      {/* ✅ Start date */}
      
      <div className=" flex flex-col">
      
         <div className="pt-5 pb-3 flex gap-10 items-center border-b  border-gray-200">


        <p className="text-md font-bold">My itinerary</p>

     </div>
     <div
        onClick={() => {
            setShowStartPicker(!showStartPicker);
          }}
     className=" flex py-5 gap-4 relative">
        <div
          className="flex items-center gap-2 
          
          bg-gray-100 border border-gray-200 rounded-md px-3 py-2 cursor-pointer"
        >
          <FaRegCalendarAlt className="text-gray-500" />
          <input
            readOnly
            className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none cursor-pointer"
            placeholder="Start date"
            value={formatDate(range.from)}
          />
        </div>
  {showStartPicker && (
        <Portal>
        <div className="fixed 
        inset-0 z-[9999] bg-black/40 flex justify-center items-center">
          <div>
<div className="bg-white rounded-xl shadow-lg p-4  flex">
            <DayPicker mode="range" 
              selected={range}
              onSelect={setRange}
             />
          </div>
           <button
                onClick={() => setShowStartPicker((el)=>!el)}
                className="mt-2 bg-gray-200 px-3 py-1 rounded-md"
              >
                Start planning
              </button>
          </div>
            
          
          </div>
          
        </Portal>
      )}
    

      {/* ✅ End date */}
      <div className=" flex flex-col">
        <div
          className="flex items-center gap-2  bg-gray-100  border border-gray-200 rounded-md px-3 py-2 cursor-pointer"
        >
          <FaRegCalendarAlt className="text-gray-500" />
          <input
            readOnly
            className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none cursor-pointer"
            placeholder="End date"
            value={formatDate(range.to)}
          />
        </div>

       
      </div>
      </div>
      <button 
      onClick={()=> Travel_Day()}
      className="
      hover:bg-green-500
      bg-[#47D6A2] rounded-md text-white py-2 text-sm">
      Auto generation
      </button>
        </div>
        {total_travel.tabs.length>0&&
           <Drawer change_category={()=>Drawer_change()}   tabs={total_travel.tabs} >


           </Drawer>
}
    </div>
  );
}
