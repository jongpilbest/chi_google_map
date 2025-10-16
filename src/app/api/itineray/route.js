import { NextResponse } from "next/server";

const fields = ['routes.viewport', 'routes.legs', 'routes.polylineDetails'];
const ROUTES_API_ENDPOINT = "https://routes.googleapis.com/directions/v2:computeRoutes";

export async function POST(request) {
  try {
    // ✅ body 파싱
    const body = await request.json();
    console.log(JSON.stringify(body,null,2))

    const url = new URL(ROUTES_API_ENDPOINT);
    url.searchParams.set('fields', fields.join(','));

    // ✅ Google API 호출
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY || 'AIzaSyBkXahoUxLe2LROntj84Lra95YI-BXqunc',
      },
      body: JSON.stringify(body,null,2), // 여기서 body는 실제 데이터
    });

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (err) {
    console.error("❌ 서버 오류:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
