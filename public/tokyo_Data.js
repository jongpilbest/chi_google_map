
  
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

export default TOKYO_AREAS