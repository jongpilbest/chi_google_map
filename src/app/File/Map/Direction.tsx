import { useEffect, useMemo } from "react";
import React from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useSelector } from "react-redux";
import { Place } from "./MapType";
import Route from "./google_map_direction/Route";
import { RoutesApi } from "./google_map_direction/routes-api";

interface Prop {
  comment: Place[];
  polylinesRef: React.MutableRefObject<google.maps.Polyline[]>;
  color?: string;
  check: boolean;
}

function splitWaypointsIntoSegments(waypoints: any[], maxWaypointsPerRequest: number) {
  const segments = [];
  for (let i = 0; i < waypoints.length; i += maxWaypointsPerRequest - 1) {
    const segment = waypoints.slice(i, Math.min(i + maxWaypointsPerRequest, waypoints.length));
    if (segment.length > 1) segments.push(segment);
  }
  return segments;
}

function Direction({ polylinesRef, color = "#ff0000", check }: Prop) {
  const comment = useSelector((state: any) => state.contorller.original_route_data);
  const map = useMap();

console.log(comment,'선호 데이터')

  // ✅ comment 바뀔 때마다 segment 재계산
  const segments = useMemo(() => {
   const timestamp = Math.ceil(Date.now() / 86_400_000) * 86_400_000 + 900_000;
  const departureTime = new Date(timestamp).toISOString();

  const routeOptions = {
    travelMode: "TRANSIT",
    departureTime,
    computeAlternativeRoutes: false,
    units: "METRIC",
  };
const route_go = async () => {
    console.log('여기 go?')
    try {
      // ✅ fetch 호출
      const res = await fetch("/api/itineray", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin: { location: { latLng: { latitude: 37.5665, longitude: 126.978 } } },
          destination: { location: { latLng: { latitude: 37.5705, longitude: 126.983 } } },
         ...routeOptions

        }),
      });

  //console.log(res,'서버데이터')

      // ✅ JSON 파싱
      const data = await res.json();
//
     // // ✅ data.routes 존재 확인
     // if (!data?.routes || !Array.isArray(data.routes)) {
     //   console.warn("⚠️ 유효한 경로 데이터가 없습니다:", data);
     //   return;
     // }
//
     // const [route] = data.routes; // 첫 번째 경로만 사용
  //
//
  

    console.log("✅ 경로 데이터:", data);
    } catch (error) {
      console.error("❌ 경로 요청 중 에러:", error);
    }
  };

route_go()
  
  }, [ comment]); // comment 바뀌면 Route 새로 생성

  // ✅ cleanup: polyline 제거
  useEffect(() => {
    return () => {
      polylinesRef.current.forEach((p) => p.setMap(null));
      polylinesRef.current = [];
    };
  }, []);

  // ✅ comment 변화마다 cleanup 후 새 경로 그리기
  useEffect(() => {
    polylinesRef.current.forEach((p) => p.setMap(null));
    polylinesRef.current = [];
  }, [comment]);

}

export default React.memo(Direction);
