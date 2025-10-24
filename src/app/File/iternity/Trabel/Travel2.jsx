
import React from "react";
import { useState } from "react";
import { Day_canlendar } from "./Day_Canceldner";
import Drawer from '../../../Place_list/Drawer'
import Inner_compont from "../../../Place_list/Inner_compont";
import { isDateRange } from "react-day-picker";
import { useSelector ,shallowEqual } from "react-redux";
export const Travel2= function(){

     const tabs = [
    { id: 0, label: "Day 1" },
    { id: 1, label: "Day 2" },
    { id: 2, label: "Day 3" },
    { id: 3, label: "Day 4" },
  ];

    
     const[filter_comment, set_filter_comment]=useState([]);
    
     const [range, setRange] = useState(isDateRange);
     const comment= useSelector((state)=>state.data_store.location_data,shallowEqual) 

              function Drawer_change(e){
              // ✅ undefined 검사 먼저
             
                // 여기 기존이랑 똑같아서 안생기는거임. 그래서 이걸 고치ㅕㄴ되ㅣㄽ ;;
              //  dispatch(change_selected_mark(e-1))
              //  const filter_data_day= Daydata[e-1] 
              //  /// 
              //  if(!filter_data_day || !Array.isArray(filter_data_day)) return;
             //
              //  dispatch(Time_Duration({ first:filter_data_day.length-1}))
              //  // 길이 구색 맞추기 
             //
              //// ✅ 두 번째 방어: 비어 있는 배열 확인
              //if (!Array.isArray(filter_data_day) || filter_data_day.length === 0) {
              //  console.warn("⚠️ Drawer_change: filter_data_day is empty", filter_data_day);
              //  return;
              //}
              // 
             //
              // const resultKeys = find_key(filter_data_day,like_location)
             //
              //
              //
             //
              //const comment_filter = resultKeys
              //.map((key) =>
              //  Object.values(comment)
              //    .flat(Infinity)
              //    .find((item) => item.id === key)
              //)
              //.filter(Boolean);
              //
              // if(comment_filter.length>0){
              //  set_filter_comment(comment_filter)
              //  //여기에 그냥 크기만 입력하는거 하나 만들???
              // }
             
             
               }
             

    return(

        <>
         <div className=" flex flex-col">
                 <Day_canlendar range={range} setRange_fun={(e)=>setRange(e)}   ></Day_canlendar>
             
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
               </Drawer>        
               
         </div>

        </>
    )
}