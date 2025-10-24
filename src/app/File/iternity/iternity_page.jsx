
'use client'
import { useState } from 'react';
import {Travel__} from './Trabel/Travel'
import { Travel2 } from './Trabel/Travel2';
export default function DateRangePicker() {
  
  const [Auto,setAuto]=useState(
    'Auto'
  )


  return (
    <div className="flex flex-2 flex-col px-8 h-full overflow-hidden relative">
      {/* ✅ Start date */}
      
    <div className="pt-5 pb-3 flex gap-10 items-center border-b  justify-between border-gray-200">


        <p className="text-md font-bold">My itinerary</p>
          <div className="flex items-center shadow rounded-2xl px-1   ">
                  <button 
                  onClick={()=>setAuto('Auto')}
                className={`flex items-center gap-1 text-sm px-4 py-1 rounded-full shadow-sm transition-all 
            ${Auto === 'Auto' ? 'bg-[#47D6A2] text-white hover:bg-[#0E9E86]' : 'bg-white hover:bg-gray-100 text-black'}`}
               >
                   
                    <span  className={`text-md ${Auto === 'Auto' ? 'text-white' : 'text-black'}`}>Auto</span>
                  </button>
                  <button 
                   onClick={()=>setAuto('Manual')}
                     className={`flex items-center gap-1 text-sm px-4 py-1 rounded-full shadow-sm transition-all 
            ${Auto === 'Manual' ? 'bg-[#47D6A2] text-white hover:bg-[#0E9E86]' : 'bg-white hover:bg-gray-100 text-black'}`}>
                  
                    <span   className={`text-md ${Auto === 'Manual' ? 'text-white' : 'text-black'}`}>Manual</span>
                  </button>
                </div>

     </div>
     {
      Auto=='Auto'&&  <Travel__></Travel__>
     }
     {
      Auto=='Manual' &&<Travel2></Travel2>
     }
 
    </div>
  );
}