// app/api/google-place/route.js
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");

  const apiKey = process.env.GOOGLE_MAPS_API_KEYS;

const searchRes = await fetch(
    `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${
      city 
    } &inputtype=textquery&fields=photos&key=${apiKey}`
  );
  const searchData = await searchRes.json();

  let photoUrl = null;

  if (searchData.candidates?.[0]?.photos?.[0]?.photo_reference) {
    const ref = searchData.candidates[0].photos[0].photo_reference;
 
    // 2️⃣ Place Photos API로 이미지 URL 생성
    photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${ref}&key=${apiKey}`;
       // const data = await res.json();
  
         return NextResponse.json(photoUrl);
  }


}
