import { YoutubeTranscript } from "youtube-transcript";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { video_url } = await req.json();

  if (!video_url) {
    return NextResponse.json({ error: "Missing video_url" }, { status: 400 });
  }

  try {
    console.log(video_url,'경로')
    const transcript = await YoutubeTranscript.fetchTranscript('2tMiFDF6dow');
 
    console.log("✅ 대본 내용 확인:", transcript);

    // 👇 여기에 요약 프롬프트나 ChatGPT API 호출도 연결 가능

    return NextResponse.json({ transcript }); // 대본도 응답으로 보냄
  } catch (error: any) {
    console.error("❌ 대본 추출 실패:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
