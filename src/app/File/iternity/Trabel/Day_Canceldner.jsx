import { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { format, isValid, parse } from "date-fns";
import { DayPicker } from "react-day-picker";
import Portal from '.././Portal'


   const formatDate = (date) => (date ? format(date, "MM/dd/yyyy") : "");

export const Day_canlendar= function({setRange_fun,range}){
        const [showStartPicker, setShowStartPicker] = useState(false);
        
    return(

                <div
                   onClick={() => {
                       setShowStartPicker(!showStartPicker);
                     }}
                className=" flex py-5 gap-4 relative    justify-between ">
                   <div
                     className="flex items-center 
                  
                     
                     bg-gray-100 border border-gray-200 rounded-md px-3 gap-2 py-2 cursor-pointer"
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
                   <div 
                   onClick={(e)=>e.stopPropagation()}
                   className="fixed 
                   inset-0 z-[9999] bg-black/40 flex justify-center items-center">
                     <div >
           <div className="bg-white rounded-xl shadow-lg p-4 gap-2 flex">
                       <DayPicker mode="range" 
                         selected={range}
                          onSelect={(selectedRange) => {
               if (!selectedRange) return; // 클릭 해제 시 무시
               if (!selectedRange.from) return; // 시작일이 없는 경우도 무시
               setRange_fun(selectedRange);
             }}
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
    )
}