import React, { use, useRef, useState } from "react";

import "react-day-picker/style.css";
import { kMeans, runKMeansWithOptimalInertia } from "k-means-clustering-js";
import { Cluster } from "k-means-clustering-js/dist/types";
import { useDispatch } from "react-redux";

import { isDateRange } from "react-day-picker";
import { useSelector } from "react-redux";
import Drawer from '../../../Place_list/Drawer'
import Inner_compont from "../../../Place_list/Inner_compont";
import { FaTrainSubway } from "react-icons/fa6";
import { FaPersonWalking } from "react-icons/fa6";

 import { useEffect } from "react";
 
 import { Time_Duration } from '@/app/Redux/store';

import { chnage_original_route_data ,change_check_Check,personal_color_place} from "../../../Redux/store";
import { change_selected_mark } from "../../../Redux/store";
import { shallowEqual } from "react-redux";
import{formatTime ,makeOrderedRoute,find_key} from '.././geoUtils'

import {Day_canlendar} from './Day_Canceldner'

export const Travel__= function(){

    const dispatch= useDispatch()
      
      const comment= useSelector((state)=>state.data_store.location_data,shallowEqual) 
      const Total_duration=useSelector((state)=>state.contorller.Duration_Time)
    
    
     const[filter_comment, set_filter_comment]=useState([]);
    
    
     const [range, setRange] = useState(isDateRange);
    
    
      const [total_travel, settotal_Travel] = useState({
        day:0,
        tabs:[]
      });
    
      const[Daydata,setDaydata]=useState([]);
    
       useEffect(() => {
      
      if ( Total_duration.every(obj => Object.keys(obj).length !=0) ) {
        // Duration이 갱신되면 강제로 렌더링 트리거 (state sync)
      
        set_filter_comment([...filter_comment]);
      }
    }, [Total_duration]);
    
  
      
        const { like_location } = useSelector((state) => state.data_store);
    
    
      // format date text
   
      
      const Travel_Day= function(){
    
          if(Object.values(like_location).length==0 || range.from ==null|| range.to ==null  ) return;
        const startDate = new Date(range.from);
        const endDate = new Date(range.to) 
        
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
     
        Make_travel(Object.values(like_location),diffDays)
    
        // 두개보내지말고 걍 .. 인덱스 보낼까..귀찮네 
      
    
      }
    
      const Make_travel= async function(places,day){
    
      const results = runKMeansWithOptimalInertia({
          data:places,
          k: day+1,
        });
    
       const final_data=results.map((el)=>makeOrderedRoute(el.points))
       
        final_data.map((el,index)=>{
        const place_id= find_key(el, like_location)
        //redux 으로 그 인덱스 값 뒤에 바꾸기 
    
        place_id.map((el)=> dispatch(personal_color_place({key:el,index:index+1})))
       })
        
        setDaydata(final_data)
        dispatch(change_check_Check())
        dispatch(chnage_original_route_data(final_data))
    
        //Drawer_change(1)
    
      }
      function Drawer_change(e){
     // ✅ undefined 검사 먼저
    
       // 여기 기존이랑 똑같아서 안생기는거임. 그래서 이걸 고치ㅕㄴ되ㅣㄽ ;;
        dispatch(change_selected_mark(e-1))
        const filter_data_day= Daydata[e-1] 
        /// 
        if(!filter_data_day || !Array.isArray(filter_data_day)) return;
    
        dispatch(Time_Duration({ first:filter_data_day.length-1}))
        // 길이 구색 맞추기 
    
      // ✅ 두 번째 방어: 비어 있는 배열 확인
      if (!Array.isArray(filter_data_day) || filter_data_day.length === 0) {
        console.warn("⚠️ Drawer_change: filter_data_day is empty", filter_data_day);
        return;
      }
       
    
       const resultKeys = find_key(filter_data_day,like_location)
    
      
      
    
      const comment_filter = resultKeys
      .map((key) =>
        Object.values(comment)
          .flat(Infinity)
          .find((item) => item.id === key)
      )
      .filter(Boolean);
     
       if(comment_filter.length>0){
        set_filter_comment(comment_filter)
        //여기에 그냥 크기만 입력하는거 하나 만들???
       }
    
    
      }
    

    return(
   <>
   
         <div className=" flex flex-col">
         <Day_canlendar range={range} setRange_fun={(e)=>setRange(e)}   ></Day_canlendar>
     
         <button 
         onClick={()=> Travel_Day()}
         className="
         hover:bg-green-500
         bg-[#47D6A2] rounded-md text-white py-2 text-sm">
         Auto generation
         </button>
           </div>
           <div className="h-full  overflow-y-auto">
           {total_travel.tabs.length>0&&
                <Drawer change_category={(e) => Drawer_change(e)} tabs={total_travel.tabs}>
             {filter_comment.map((El, idx) => (
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
   }
       </div>
   </>

    )
}