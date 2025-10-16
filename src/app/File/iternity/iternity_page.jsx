
'use client'
import React, { use, useRef, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { format, isValid, parse } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { kMeans, runKMeansWithOptimalInertia } from "k-means-clustering-js";
import { Cluster } from "k-means-clustering-js/dist/types";
import { useDispatch } from "react-redux";
import Portal from './Portal'
import { isDateRange } from "react-day-picker";
import { useSelector } from "react-redux";
import Drawer from '../../Place_list/Drawer'
import Inner_compont from "../../Place_list/Inner_compont";
 //const tabs = [
 //   { id: "food", label: "Food" },
 //   { id: "adventure", label: "Adventure" },
 //   { id: "shopping", label: "Shopping" },
 // ];
import { chnage_original_route_data ,change_check_Check} from "../../Redux/store";
import { change_selected_mark } from "../../Redux/store";
import { shallowEqual } from "react-redux";
function makeOrderedRoute(points) {
  if (points.length <= 2) return points;

  // 1️⃣ 출발점·도착점 찾기 (가장 멀리 떨어진 두 점)
  let maxDist = 0;
  let endpoints = [null, null];

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const dist = Math.sqrt(
        (points[i][0] - points[j][0]) ** 2 +
        (points[i][1] - points[j][1]) ** 2
      );
      if (dist > maxDist) {
        maxDist = dist;
        endpoints = [points[i], points[j]];
      }
    }
  }

  const [origin, destination] = endpoints;

  // 2️⃣ 중간 포인트 정렬 (출발→도착 방향 직선 투영)
  const dx = destination[1] - origin[1];
  const dy = destination[0] - origin[0];

  const middlePoints = points
    .filter(
      (p) => !(p[0] === origin[0] && p[1] === origin[1]) &&
             !(p[0] === destination[0] && p[1] === destination[1])
    )
    .map((p) => ({
      point: p,
      proj:
        ((p[1] - origin[1]) * dx + (p[0] - origin[0]) * dy) /
        (dx * dx + dy * dy),
    }))
    .sort((a, b) => a.proj - b.proj)
    .map((d) => d.point);

  // 3️⃣ 최종 경로 순서 배열 반환
   return [origin, ...middlePoints, destination];
}


export default function DateRangePicker() {
  const dispatch= useDispatch()
  const comment= useSelector((state)=>state.data_store.location_data,shallowEqual) 

 const[filter_comment, set_filter_comment]=useState([]);


 const [range, setRange] = useState(isDateRange);


  const [total_travel, settotal_Travel] = useState({
    day:0,
    tabs:[]
  });

  const[Daydata,setDaydata]=useState([]);

   

  const [showStartPicker, setShowStartPicker] = useState(false);
  
     const { like_location } = useSelector((state) => state.data_store);


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


    Make_travel(Object.values(like_location),diffDays)
    dispatch(change_check_Check())
    // 두개보내지말고 걍 .. 인덱스 보낼까..귀찮네 



  }

  const Make_travel= async function(places,day){



    


  const results = runKMeansWithOptimalInertia({
      data:places,
      k: day+1,
    });

   const final_data=results.map((el)=>makeOrderedRoute(el.points))
   setDaydata(final_data)
   //데이터 저장하는거
   //여기 그 direction (map) 에 보내는곳 > map 에서 좀 수정 부탁요 
     dispatch(chnage_original_route_data(final_data))

  }
  function Drawer_change(e){
    // 여기서 인덱스 번호를 얻어와서 걍 filter 해주면 되는거아님????????????????
    dispatch(change_selected_mark(e-1))
    const filter_data_day= Daydata[e-1] 
    // 여기 이중 배열 

   const resultKeys = Object.entries(like_location)
  .filter(([key, value]) =>
    filter_data_day.some((d) => d.join(",") === value.join(","))
  )
  .map(([key]) => key);

  
  

   const comment_filter=Object.values(comment).flat(Infinity).filter((el)=>resultKeys.includes(el.id))
   if(comment_filter.length>0){
    set_filter_comment(comment_filter)
    // 제대로 나오니 이제 이거 결과넣어봐아아아아
   }


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
           <Drawer change_category={(e)=>Drawer_change(e)}   tabs={total_travel.tabs} >
            { filter_comment.length>0 && filter_comment.map((El) => (
          <Inner_compont key={El.googlePlace} data={El} />
        ))}


           </Drawer>
}
    </div>
  );
}
