import { useEffect, useMemo } from "react";
import React from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useSelector,useDispatch } from "react-redux";
import { Place } from "./MapType";
import Route from "./google_map_direction/Route";
import { RoutesApi } from "./google_map_direction/routes-api";
import { Time_Duration } from '@/app/Redux/store';
interface Prop {
  comment?: Place[];
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
  const dispatch= useDispatch();

 

  const handleDurationCalculated= function(index,time){
   // console.log(time,'타임?//')

  dispatch(Time_Duration({ index:index,time:time,first:-1}))
  }
  const comment = useSelector((state: any) => state.contorller.original_route_data);
  const map = useMap();
  const routeLibrary = useMapsLibrary("routes");
 const Find_index_mark =  useSelector((state: any) => state.contorller.select_mark_index )

  const apiClient = new RoutesApi(process.env.GOOGLE_MAPS_API_KEYS);

  // ✅ comment 바뀔 때마다 segment 재계산
  const segments = useMemo(() => {
    if (!comment || !comment[0]) return [];
    return splitWaypointsIntoSegments(comment[0], 10);
  }, [comment]);

  const timestamp = Math.ceil(Date.now() / 86_400_000) * 86_400_000 + 900_000;
  const departureTime = new Date(timestamp).toISOString();

  const routeOptions = {
    travelMode: "TRANSIT",
    departureTime,
    computeAlternativeRoutes: false,
    units: "METRIC",
  };

  const appearance = {
    walkingPolylineColor: "#000",
    defaultPolylineColor: "#7c7c7c",
    stepMarkerFillColor: "#333333",
    stepMarkerBorderColor: "#000000",
  };

  // ✅ Route 배열 memoization (comment 바뀔 때마다 새로 생성)
  const routesToRender = useMemo(() => {
    if(comment.length==0) return ;

    const segment= comment[Find_index_mark]
      map.panTo({
        'lat':segment[0][0],
        'lng':segment[0][1]
      });
       map.setZoom(15);
      const routeList = [];
      for (let i = 0; i < segment.length - 1; i++) {
      
        const origin = { latLng: { latitude: segment[i][0], longitude: segment[i][1] } };
        const destination = { latLng: { latitude: segment[i + 1][0], longitude: segment[i + 1][1] } };

        routeList.push(
          <Route
          index={i}
          onDurationCalculated={(index,e)=>handleDurationCalculated(index,e)}
            key={`route--${origin.latLng.latitude}`} // ✅ comment 변할 때마다 key 변경
            apiClient={apiClient}
            origin={origin}
            destination={destination}
            routeOptions={routeOptions}
            appearance={appearance}
          />
        );
      }
      return routeList;
    
  }, [Find_index_mark]); // comment 바뀌면 Route 새로 생성

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
  }, [Find_index_mark]);

  return <>{routesToRender}</>;
}

export default React.memo(Direction);
