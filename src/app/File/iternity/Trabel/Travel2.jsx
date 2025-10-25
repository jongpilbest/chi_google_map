
import React from "react";
import { useState ,useEffect } from "react";
import { Day_canlendar } from "./Day_Canceldner";
import Drawer from '../../../Place_list/Drawer'
import Inner_compont from "../../../Place_list/Inner_compont";
import { isDateRange } from "react-day-picker";
import { useSelector ,shallowEqual,useDispatch } from "react-redux";
 import { Time_Duration } from '@/app/Redux/store';
 import { FaTrainSubway } from "react-icons/fa6";
import { FaPersonWalking } from "react-icons/fa6";
import{formatTime} from '.././geoUtils'


 import { change_selected_mark,chnage_original_route_data,change_check_Check  } from "../../../Redux/store";
export const Travel2= function(){

     const tabs = [
    { id: 0, label: "Day 1" },
    { id: 1, label: "Day 2" },
    { id: 2, label: "Day 3" },
    { id: 3, label: "Day 4" },
  ];
  const dispatch= useDispatch();

    const [selectedDay, setSelectedDay] = useState(0);
     const[filter_comment, set_filter_comment]=useState([]);
    
     const [range, setRange] = useState(isDateRange);
     const comment= useSelector((state)=>state.data_store.location_data,shallowEqual) 
       
     const { color_location } = useSelector((state) => state.data_store); 
      const Total_duration=useSelector((state)=>state.contorller.Duration_Time)  

              function Drawer_change(e){

              
             
                const resultKeys=Object.keys(color_location).filter(key => color_location[key] === e+1);
      

               const comment_filter = resultKeys
              .map((key) =>
                Object.values(comment)
                  .flat(Infinity)
                  .find((item) => item.id === key)
                 )
               set_filter_comment(comment_filter)
              setSelectedDay(e);
           
               }
             
useEffect(() => {
  Drawer_change(selectedDay);
}, [color_location])

const Travel_Day = function(){
       dispatch(Time_Duration({ first:filter_comment.length-1}))
       const Route_location= filter_comment.map((el)=>Object.values(el.location))
       dispatch(chnage_original_route_data([Route_location]))
       dispatch(change_selected_mark(0))
       dispatch(change_check_Check())
 
}

    return(

        <>
         <div className=" flex flex-col h-full">
                 <Day_canlendar range={range} setRange_fun={(e)=>setRange(e)}   ></Day_canlendar>
               <div className="h-full flex-1 pb-24  overflow-y-auto ">
          <Drawer change_category={(e) => Drawer_change(e)} tabs={tabs}>
                     {filter_comment.length>0 &&filter_comment.map((El, idx) => (
                   <React.Fragment key={El.googlePlace}>
                     {/* 장소 컴포넌트 */}
                     <Inner_compont key={El.describe} data={El} />
           
                     {/* 다음 장소가 존재할 때만 시간 표시 */}
                     {Total_duration?.[idx] && (
                       <div className="flex flex-row gap-4 items-center my-2 text-gray-600 text-sm justify-center">
                         {Total_duration[idx].WALK>0 && 
                           
                           <span className="flex text-xs ">
                        <FaPersonWalking></FaPersonWalking>
                          :   {formatTime (Total_duration[idx].WALK) ?? "-"}
                         </span>
           }
                         {
                           Total_duration[idx].TRANSIT>0&&
                           <span className="flex text-xs">
                         
                                <FaTrainSubway></FaTrainSubway>
                          : {formatTime (Total_duration[idx].TRANSIT) ?? "-"}
                         </span>
           }
                       </div>
                     )}
                   </React.Fragment>
                   
                 ))}
                      { filter_comment.length>0 &&  <button 
         onClick={()=> Travel_Day()}
         className=" w-full
         hover:bg-green-500  
          h-8
          mt-5
         bg-[#47D6A2] rounded-md text-white  text-sm">
         Route generation
         </button>
          }
               </Drawer>        
       
         </div>
</div>
        </>
    )
}