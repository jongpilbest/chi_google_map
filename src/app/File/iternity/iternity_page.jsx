
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
import { FaTrainSubway } from "react-icons/fa6";
import { FaPersonWalking } from "react-icons/fa6";
 //const tabs = [
 //   { id: "food", label: "Food" },
 //   { id: "adventure", label: "Adventure" },
 //   { id: "shopping", label: "Shopping" },
 // ];
import { chnage_original_route_data ,change_check_Check} from "../../Redux/store";
import { change_selected_mark } from "../../Redux/store";
import { shallowEqual } from "react-redux";
 const formatTime = (seconds) => {
    if (!seconds || seconds <= 0) return null;
    const minutes = Math.floor(seconds / 60);
    const remainSeconds = Math.floor(seconds % 60);
    return `${minutes}m ${remainSeconds}s`;
  };

  function haversineDistance(p1, p2) {
  const R = 6371; // 지구 반지름 (단위: km)
  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(p2[0] - p1[0]);
  const dLon = toRad(p2[1] - p1[1]);
  const lat1 = toRad(p1[0]);
  const lat2 = toRad(p2[0]);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // km 단위 거리
}
  function makeOrderedRoute(points) {
  if (points.length <= 2) return points;
  console.log(points)

  // ✅ Haversine 기반 거리 계산
  let maxDist = 0;
  let endpoints = [null, null];

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const dist = haversineDistance(points[i], points[j]);
      if (dist > maxDist) {
        maxDist = dist;
        endpoints = [points[i], points[j]];
      }
    }
  }

  const [origin, destination] = endpoints;

  // ✅ 중간 포인트를 출발점에서의 거리순으로 정렬
  const middlePoints = points
    .filter(
      (p) => !(p[0] === origin[0] && p[1] === origin[1]) &&
             !(p[0] === destination[0] && p[1] === destination[1])
    )
    .map((p) => ({
      point: p,
      dist: haversineDistance(origin, p),
    }))
    .sort((a, b) => a.dist - b.dist)
    .map((d) => d.point);

      console.log(origin, ...middlePoints, destination)

  return [origin, ...middlePoints, destination];
}



export default function DateRangePicker() {
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

   

  const [showStartPicker, setShowStartPicker] = useState(false);
  
     const { like_location } = useSelector((state) => state.data_store);


  // format date text
  const formatDate = (date) => (date ? format(date, "MM/dd/yyyy") : "");
  
  const Travel_Day= function(){
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
     Drawer_change(1)

  }
  function Drawer_change(e){
    // 여기서 인덱스 번호를 얻어와서 걍 filter 해주면 되는거아님????????????????
    dispatch(change_selected_mark(e-1))
    const filter_data_day= Daydata[e-1] 
    // 여기 이중 배열 
   

   const resultKeys = filter_data_day.map((d) => {
  const found = Object.entries(like_location).find(
    ([key, value]) =>
      Array.isArray(value) &&
      d[0] === value[0] &&
      d[1] === value[1]
  );
  return found ? found[0] : null; // 매칭되는 key만 반환
}).filter(Boolean);
 
  console.log(resultKeys,'정답은?')
  
  

  const comment_filter = resultKeys
  .map((key) =>
    Object.values(comment)
      .flat(Infinity)
      .find((item) => item.id === key)
  )
  .filter(Boolean);
  console.log(comment_filter,'결과')
   if(comment_filter.length>0){
    set_filter_comment(comment_filter)
    // 제대로 나오니 이제 이거 결과넣어봐아아아아
   }


  }



  return (
    <div className="flex flex-2 flex-col px-8 h-full overflow-hidden relative">
      {/* ✅ Start date */}
      
      <div className=" flex flex-col">
      
         <div className="pt-5 pb-3 flex gap-10 items-center border-b  border-gray-200">


        <p className="text-md font-bold">My itinerary</p>

     </div>
     <div
        onClick={() => {
            setShowStartPicker(!showStartPicker);
          }}
     className=" flex py-5 gap-4 relative    justify-between ">
        <div
          className="flex items-center 
       
          
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
               onSelect={(selectedRange) => {
    if (!selectedRange) return; // 클릭 해제 시 무시
    if (!selectedRange.from) return; // 시작일이 없는 경우도 무시
    setRange(selectedRange);
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
          {Total_duration.length>0 && Total_duration?.[idx] && (
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
    </div>
  );
}
