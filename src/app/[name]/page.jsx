"use client";


import {store } from '../Redux/store'
import { Provider } from 'react-redux';

 // 버튼 아이콘
import Find from "../File/Short-video/Find";
import Mappage from '../File/Map/Map'
import Controller from '../File/Video/Controll'
import History from '../File/VideoHistory/History'

import Videopage from '../File/Video/Video'
import Map_Contorller from "../File/Contorller/Map_Contorller";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { use } from "react";


export default function Intro({ params}) {

  const { name } = use(params);

const queryClient = new QueryClient();
  //const onLoad= useCallback(()=>addZoneLayer(map))
  
  return (
     <Provider store={store}>
  <div className=" flex-1 w-full">
  <div className="h-full px-20  bg-gray-100 pb-8 flex flex-col gap-y-5">
    <div className="w-full  flex-[4.4] flex flex-col ">
     <Controller></Controller>
      <div className=" flex-1  flex  gap-x-5   "> 
         
          <Map_Contorller></Map_Contorller>
          <Videopage></Videopage>
           <Mappage name={name}></Mappage>

           
      </div>
    </div>
     <History></History>
         <QueryClientProvider client={queryClient}>
         <Find name={name}></Find>
         </QueryClientProvider>
   
  </div>
</div>
</Provider>
  );
}
