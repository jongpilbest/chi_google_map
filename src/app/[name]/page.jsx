"use client";


import {store } from '../Redux/store'
import { Provider } from 'react-redux';
import Page_list from '../Place_list/page_list';
 // 버튼 아이콘
import Find from "../File/Short-video/Find";
import Mappage from '../File/Map/Map'
import Controller from '../File/Video/Controll'
import History from '../File/VideoHistory/History'
import Iternity_page from '../File/iternity/iternity_page';
import Videopage from '../File/Video/Video'
import Map_Contorller from "../File/Contorller/Map_Contorller";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { use, useState } from "react";
import dynamic from 'next/dynamic';
const MapPage = dynamic(() => import('@/app/File/Map/Map'), { ssr: false });


export default function Intro({ params}) {

  const { name } = use(params);
  const Change= function(e){
    setChoice(e)
  }

const queryClient = new QueryClient();
  //const onLoad= useCallback(()=>addZoneLayer(map))
  const[Choice,setChoice]=useState('Explore')
  return (
<Provider store={store}>
  {/* 전체 화면 기준 flex-col */}
  <div className="flex flex-col h-screen w-full bg-amber-700">
       <Map_Contorller></Map_Contorller>
    {/* 상단 고정 Controller */}
    <div className="h-15 bg-white">
      <Controller Change={(e)=>Change(e)} Choice={Choice}/>
    </div>

    {/* 나머지 영역이 자동으로 확장 */}
    <div className="flex-1 bg-gray-100 flex flex-row overflow-hidden">
      
      {/* 왼쪽 영역 */}
      <div className="flex-[0.7] flex flex-col bg-white overflow-hidden">
        <Videopage />
       {/* 내부 스크롤 영역  <Page_list /> */}
       {Choice=='Explore' && <Page_list></Page_list>}
       {Choice=='MyTrip' &&<Iternity_page></Iternity_page> }
      </div>

      {/* 오른쪽 지도 영역 */}
      <div className="flex-2 bg-white">
        <Mappage name={name} />
      </div>

    </div>
  </div>
</Provider>
  );
}


//<History></History>
//         <QueryClientProvider client={queryClient}>
//         <Find name={name}></Find>
//         </QueryClientProvider>

//     <Map_Contorller></Map_Contorller>