'use client'; // 클라이언트 컴포넌트임을 명시

import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { useSelector } from 'react-redux';

// ReactPlayer를 dynamic import (SSR 안 됨 + 로딩 컴포넌트 설정)
const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
  loading: () => <div>🎥 비디오 플레이어 로딩 중...</div>,
});

export default function Videopage() {
  const youtube_link = useSelector((state: any) => state.url.url);
  const playerRef = useRef(null);

  return (
    <div className="flex-[5] rounded-lg">
      <ReactPlayer
        ref={playerRef}
        src ={youtube_link}  // 주의: `url` prop 써야 함 (아니면 영상 안 나옴)
        controls
        playing={false}
        width="100%"
        height="100%"
      />
    </div>
  );
}
