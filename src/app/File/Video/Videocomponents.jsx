"use client";

import ReactPlayer from 'react-player'
import { forwardRef ,useState,useEffect} from "react";
import { useSelector } from "react-redux"
// ref가 ReactPlayer 인스턴스에 '직접' 붙도록 반드시 forwardRef 사용
const VideoPlayer = forwardRef(function VideoPlayer({ url }, ref) {

    const youtube_link = useSelector((state) => state.url.current_video);
     const [ready, setReady] = useState(false);
   useEffect(() => {
    setReady(false);
  }, [url]);
  
  useEffect(() => {
    if (ready && ref.current && youtube_link != null) {
      const seekTime = Number(youtube_link);
      // 약간 딜레이 후 실행 (iframe 갱신 대기)
      const timer = setTimeout(() => {
        try {
          ref.current.seekTo(seekTime, "seconds");
        } catch (err) {
          console.warn("Seek failed:", err);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [ready, youtube_link]);

  return (
    <ReactPlayer
      ref={ref}
      url={url}
      controls
      width="100%"
      height="100%"
      playing={false}
      onReady={() => setReady(true)}
  
    />
  );
});

export default VideoPlayer;
