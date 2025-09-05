"use client";

import ReactPlayer from 'react-player'
import { forwardRef } from "react";
import { useSelector } from "react-redux"
// ref가 ReactPlayer 인스턴스에 '직접' 붙도록 반드시 forwardRef 사용
const VideoPlayer = forwardRef(function VideoPlayer({ url }, ref) {

    const youtube_link = useSelector((state) => state.url.current_video);
    ref.current?.seekTo(youtube_link, "seconds"); 

  return (
    <ReactPlayer
      ref={ref}
      url={url}
      controls
      width="100%"
      height="100%"
      playing={false}
  
    />
  );
});

export default VideoPlayer;
