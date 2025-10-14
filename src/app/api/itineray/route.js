// server/api/computeRoute.ts

import { NextResponse } from "next/server";
export async function POST(request) {
  const ROUTES_API_ENDPOINT =
    "https://routes.googleapis.com/directions/v2:computeRoutes";

  const fields =
    "routes.viewport,routes.legs,routes.polyline.encodedPolyline";

  const response = await fetch(ROUTES_API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY,
  
    },
    body: JSON.stringify(request.body),
  });

  const data = await response.json();
    return NextResponse.json(data);
    
}
