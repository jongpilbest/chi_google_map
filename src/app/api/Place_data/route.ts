
import { NextResponse } from "next/server";

import fs from "fs";
import path from "path";


export async function  GET(req: Request) {
  const { name } = await req.json();

  if (!name) {
    return NextResponse.json({ error: "Missing video_url" }, { status: 400 });
  }

  try {
   
    const filePath = path.join(process.cwd(), "src", "Data", name , "summary.json"); 
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(fileContent);

    // 👇 여기에 요약 프롬프트나 ChatGPT API 호출도 연결 가능
    return NextResponse.json({ data }); // 현재 데이터를 보냄
  } catch (error: any) {
    console.error("❌ 대본 추출 실패:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
