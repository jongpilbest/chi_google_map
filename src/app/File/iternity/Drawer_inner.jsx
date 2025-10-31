import React from 'react'
import Drawer from '../../Place_list/Drawer'
export default function Drawer_inner({total_travel}) {

     function Drawer_change(e){
     // ✅ undefined 검사 먼저
    
       // 여기 기존이랑 똑같아서 안생기는거임. 그래서 이걸 고치ㅕㄴ되ㅣㄽ ;;
        dispatch(change_selected_mark(e-1))
        const filter_data_day= Daydata[e-1] 
        /// 
        if(!filter_data_day || !Array.isArray(filter_data_day)) return;
    
        dispatch(Time_Duration({ first:100},))
        // 길이 구색 맞추기 
    
      // ✅ 두 번째 방어: 비어 있는 배열 확인
      if (!Array.isArray(filter_data_day) || filter_data_day.length === 0) {
        console.warn("⚠️ Drawer_change: filter_data_day is empty", filter_data_day);
        return;
      }
       
    
       const resultKeys = filter_data_day.map((d) => {
      const found = Object.entries(like_location).find(
        ([key, value]) =>
          Array.isArray(value) &&
          d[0] === value[0] &&
          d[1] === value[1]
      );
      return found ? found[0] : null; // 매칭되는 key만 반환
    }).filter(Boolean);
     
    
      
      
    
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
    
      
  return (
    <>

    {total_travel.tabs.length>0 &&
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
       </>
  )
}
