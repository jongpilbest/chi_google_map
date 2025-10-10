import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import Glance_section from './Glance_section';
import { FaArrowLeft } from "react-icons/fa6";

import { useSelector ,shallowEqual} from 'react-redux';
import Inner_compont from './Inner_compont';
const TOKYO_AREAS = [
  {
    city:"Shibuya",
    name: "시부야",
    description:
      "젊음과 패션, 그리고 활기찬 에너지가 넘치는 도쿄의 중심지입니다. 세계적으로 유명한 시부야 스크램블 교차로와 쇼핑 거리, 다양한 카페와 나이트라이프가 밀집해 있습니다.",
      tagging: "#FashionHub  #YouthEnergy",
      place_id:'ChIJ0Qgx67KMGGARd2ZbObLZHPE',
    location: {
      "lat": 35.661971,
      "lng": 139.703795
    },
    image:'https://lh3.googleusercontent.com/gps-cs-s/AC9h4npop0jZj7ECma-St007qn0gXYnxEH3X8vxQguHXWgI_UpITTezqHOel0RUClkiG_P49KHYeT6j4nPPdPf9--wOGT7FCztiX1ppXbHfZlJeB3y7TEyYJu52wf3vL8iEKydI0RC5irQ=s1600-w600'

    },
 {city:'Minato City',
    name: "미나토구",
    description:
      "도쿄타워, 롯폰기 힐즈, 오다이바 등 현대적인 명소들이 모여 있는 지역으로, 외국 대사관과 글로벌 기업이 많아 국제적인 분위기가 느껴집니다.",
   tagging: "#TokyoTower #GlobalVibes",
  place_id:'ChIJ8yIZtLuLGGARrGzw8nX96zM',  
     location: {
      "lat":  35.658081,
      "lng": 139.751508,
    },
    image:'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrQdZ3Z_6dTtr4ODNouB3M445ZsktoyY1qCmBuzTyF3BtALUBNGfCNKNlrkwLZbUgpwKbWrcV3uGAH8OJBoWTAX0X4BGIiR6Y6aYpraqxWxXN9kFn5HAYiWfSjkNETgXEj_HZAI=s1600-w800'
  },
{
  city:'Chuo City',
    name: "Chuo city",
    description:
      "도쿄의 품격을 느낄 수 있는 거리로, 고급 부티크와 미식 레스토랑, 네온사인이 빛나는 야경이 인상적인 지역입니다.",
    tagging: "#TokyoCenter #ShoppingAndGourmet",
   place_id:'ChIJyZrIjGCJGGARonG69OLd0ag',  
   location: {
      "lat": 35.670639,
      "lng": 139.771989,
    },
    image:'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nprt12FvAhohbnJ0DW8o5bqTWf6g9drmgLkWVuY4Ay-Vr8ihb-L02klazuvNBiHvKybswE9CO3qGiqQRVPBTUa_QXCgu7dqxE0OKxE0hAatQ3MloR0fDfvadDwkZpmfYF_2hR4=s1600-w800'
  },
 {
  city:'Chiyoda City',
    name: "치요다구",
    description:
      "일본의 정치와 역사의 중심지로, 도쿄 황궁과 국회의사당, 주요 정부 기관들이 자리 잡고 있습니다.",
      tagging: "#ImperialPalace #HistoricCore",
      place_id:'ChIJTfUTCwyMGGARiIHk7juVMLY',
      location: {
      "lat":  35.694031,
      "lng":139.753772,
    },
    image:'https://lh3.googleusercontent.com/gps-cs-s/AC9h4npQSC7-4NL91uhK8OWnCjkMBp8dgwag-9NsZDjO9pwKOqbEQkLN_9pdcNkLcBYBMRqACxC6wtfNycSJVJ6T3g-VoVDFWlPW_5vba5qWdKVBY8GiCy0GIWQhWVV7-Ajj4tmYkJ8sMQ=s1600-w800'
    },
   {
    city:'Taito City',
    name: "다이토구",
    description:
      "아사쿠사의 센소지 사찰과 우에노 공원이 있는 도쿄의 전통 문화 중심지입니다. 오래된 거리 분위기와 현대적 감성이 공존합니다.",
  tagging: "#Traditional #SensojiTemple",
  place_id:'ChIJ_y6oNpaOGGARwEcmcboORxU',
  location: {
      "lat":   35.712574,
      "lng": 139.780204,
    },
    image:'https://lh3.googleusercontent.com/gps-cs-s/AC9h4noQG11bF1ZBox4lyhrrSncKcgyJ8WSH-d3JXXuEFkkJlfvYIT0xFSffaesVPKyb_WPHuNcag4ViiE7Hi24YnN8x8hg1bAXVMFbCZcVCoEkA4ea5WeQb4JMQUkSZfNhKWvWGfTNeDg=s1600-w800',
    },
{
  city:'Musashino',
    name: "무사시노시",
    description:
      "도쿄 서쪽의 조용한 교외 도시로, 기치조지와 이노카시라 공원으로 유명합니다. 예술적인 감성과 여유로운 분위기가 특징입니다.",
    tagging: "#Kichijoji #ArtisticMood",
    place_id:'ChIJ4bZZN6_vGGAR1b_G8BGrgVU',
    location: {
      "lat":  35.717692,
      "lng": 139.566088,
    },
    image:'https://lh3.googleusercontent.com/gps-cs-s/AC9h4npZwwWQ2Y-UmLx1qz6xXG2ygxTxxFdSX7mpMMI_SCz0hzASugP8DdnOJMxwoAIhxX1Vv22CsrHdVREDlyhTZY7Yo25pLRlGyDnwMsr33aXZR1HQGsP9L7SBWlVE0ZxdVM4PG9w=s1600-w800'
    },

{
  city: 'Kamakura',
  name: "가마쿠라시",
  description:
    "가나가와현 남부의 해안 도시로, 불상과 사찰, 바다가 어우러진 역사적인 관광지입니다. 고대 일본의 수도였던 곳으로 전통과 자연이 조화를 이루며, 여유로운 분위기와 아름다운 경관으로 유명합니다.",
  tagging: "#HistoricCity #GreatBuddha #BeachVibes",
  place_id: 'ChIJGVasgJtFGGARAiWfOXp0AFc',
  location: {
    lat:  35.319213,
    lng: 139.546673
  },
  image:'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqMye2qYmDvrUpcGGZwczgmmi89PQYq6cp0ohrxUfUpQ53QlxkiAvQ5wsoWVLJYeN-IJK7-NniGx5JtZwTk6Yvaxuq5U1E-qwO68Zgmm6Y7GvGG7WM67CqGxFxruFngnjTkiMR-Pw=s1600-w800'
}

]



export default function page_list() {
  
  const comment= useSelector((state)=>state.data_store.location_data,shallowEqual) 
 
 const[filter_comment, set_filter_comment]=useState([]);



  const [modal,setmodal]=useState({
    modal:false,
    name:''
  });
 

  function modal_change(name){
  
    setmodal({
      modal:true,
      name:name
    })
    const comment_filter=Object.values(comment).flat(Infinity).filter((el)=>el.city==name)    
    set_filter_comment(comment_filter)
  }

  
  
  return (
    <div className="flex flex-2 flex-col px-8 h-full overflow-hidden relative">
   
      {/* 상단 영역 */}
      <div className="pt-5 pb-3 flex gap-10 items-center border-b border-gray-200">
       {modal.modal && (
  <div className="absolute inset-0 z-50 bg-white flex flex-col px-10 rounded-md">
    <div className="w-full h-full shadow-xl flex flex-col">
      {/* 헤더 */}
      <header className="h-14 bg-gray-100 flex justify-between items-center px-3 border-b border-gray-200">
        <p className="font-bold text-sm">{modal.name}</p>
        <button
          onClick={() =>
            setmodal({
              modal: false,
              name: '',
            })
          }
          className="bg-[#47D6A2] p-1 rounded-md"
        >
          <FaArrowLeft className="text-white" />
        </button>
      </header>

      {/* 콘텐츠 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto p-3">
        {filter_comment.map((El) => (
          <Inner_compont key={El.googlePlace} data={El} />
        ))}
      </div>
    </div>
  </div>
)}


        <p className="text-md font-bold">Place</p>
        <div className="flex items-center flex-1 bg-gray-100 shadow rounded-md px-3 py-1">
          <input
            placeholder="Find Place"
            className="text-xs h-6 px-2 w-full text-gray-800 bg-transparent outline-none placeholder-gray-400"
          />
          <button className="text-white w-5 h-5 flex justify-center items-center hover:text-green-700 transition-colors bg-[#47D6A2] rounded-md">
            <CiSearch className="text-sm" />
          </button>
        </div>
      </div>
     

      {/* 버튼 영역 */}
      <div className="flex gap-8 justify-between py-5">
        <button className="flex-1 py-1.5 bg-[#47D6A2] text-sm text-white rounded-md">
          Glance
        </button>
        <button className="flex-1 py-1.5 bg-gray-100 text-sm rounded-md">
          Concise
        </button>
      </div>

      <div className="flex-1 overflow-y-auto grid grid-cols-2 gap-4 pb-5">
        {TOKYO_AREAS.map((el,index) => (
          <Glance_section 
          modal_change={(el)=>modal_change(el)}
          key={el+index} city_data ={el}/>
        ))}
      </div>

     
    </div>
  );
}


