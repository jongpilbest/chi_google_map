"use client";

import dynamic from "next/dynamic";
import { useRef, useState, useCallback } from "react";
import { useSelector } from "react-redux";


// forwardRef 된 컴포넌트를 dynamic import (SSR 끔)
const VideoPlayer = dynamic(() => import("./Videocomponents"), {
  ssr: false,
});

export default function Page() {
  const playerRef = useRef(null);
   const youtube_link = useSelector((state) => state.url.url);


  return (
  <>
  </> 
  );
}

//   <div className=" flex-[5]  rounded-lg bg-white" >
   //   <VideoPlayer
   //     ref={playerRef}
   //     url={youtube_link}
   //   />
   // </div>

