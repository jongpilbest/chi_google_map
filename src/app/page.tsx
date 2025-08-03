"use client";


import { useEffect, useState, useRef, useCallback } from "react";
const trees = [
  { name: "Oak, English", lat: 43.64, lng: -79.41, key: "A" },
  { name: "Maple", lat: 43.65, lng: -79.42, key: "B" },
  // ...더 많은 나무들
];
// [{ name: "Oak, English", lat: 43.64, lng: -79.41, key: "ABCD" }]

import {store } from './Redux/store'
import { Provider } from 'react-redux';

 // 버튼 아이콘

import Mappage from './File/Map/Map'
import Controller from './File/Video/Controll'
import History from './File/VideoHistory/History'
import Generate from './File/Short-video/Generate'
import Videopage from './File/Video/Video'
export default function Intro() {


  //const onLoad= useCallback(()=>addZoneLayer(map))
  
  return (
     <Provider store={store}>
  <div className=" flex-1 w-full">
  <div className="h-full px-20  bg-gray-100 pb-10 flex flex-col gap-y-5">
    <div className="w-full  flex-[4.6] flex flex-col ">
     <Controller></Controller>
      <div className=" flex-1  flex  gap-x-5  "> 
        <div className=" w-12 bg-white rounded-lg"> </div>
          
          
          <Videopage></Videopage>
           <Mappage></Mappage>
      </div>
    </div>
     <History></History>
    <div className="w-full flex-[2] gap-x-4 flex rounded-lg ">
       <Generate></Generate>
      <div className="flex-[4] bg-white rounded-xl  "></div>
    </div>
  </div>
</div>
</Provider>
  );
}


function addZoneLayer ()  {
  //if(!map.getMapCapabilities().isDataDrivenStylingAvailable)return;


};

