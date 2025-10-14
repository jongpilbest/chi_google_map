import React, {useEffect, useState} from 'react';
import {
  AdvancedMarker,
  AdvancedMarkerAnchorPoint,
  useMap
} from '@vis.gl/react-google-maps';

import {Polyline} from './Polylines';
import {RoutesApi} from './routes-api';

const defaultAppearance = {
  walkingPolylineColor: '#000000',
  defaultPolylineColor: '#9a1e45',
  stepMarkerFillColor: '#333333',
  stepMarkerBorderColor: '#000000'
};

type Appearance = typeof defaultAppearance;

export type RouteProps = {
  apiClient: RoutesApi;
  origin: {lat: number; lng: number};
  destination: {lat: number; lng: number};
  routeOptions?: any;
  appearance?: Partial<Appearance>;
};

const Route = (props: RouteProps) => {

  const {apiClient, origin, destination, routeOptions} = props;

  const [route, setRoute] = useState<any>(null);

  const map = useMap();
  useEffect(() => {
  if (!map) return;

  const route_go = async () => {
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

      // ✅ 응답 상태 확인
      if (!res.ok) {
        const errText = await res.text();
        console.error("❌ API 요청 실패:", res.status, errText);
        return;
      }

      // ✅ JSON 파싱
      const data = await res.json();

      // ✅ data.routes 존재 확인
      if (!data?.routes || !Array.isArray(data.routes)) {
        console.warn("⚠️ 유효한 경로 데이터가 없습니다:", data);
        return;
      }

      const [route] = data.routes; // 첫 번째 경로만 사용
      setRoute(route);

      // ✅ 지도에 fitBounds 적용 (viewport 존재 시)
      const viewport = route.viewport;
      if (viewport) {
        const bounds = {
          north: viewport.high.latitude,
          south: viewport.low.latitude,
          east: viewport.high.longitude,
          west: viewport.low.longitude,
        };
        map.fitBounds(bounds);
      }

      console.log("✅ 경로 데이터:", route);
    } catch (error) {
      console.error("❌ 경로 요청 중 에러:", error);
    }
  };

  route_go();
}, [map, origin, destination, routeOptions]);

 
  if (!route) return null;

  // With only two waypoints, our route will have a single leg.
  // We now want to create a visualization for the steps in that leg.
  const routeSteps: any[] = route.legs[0].steps;

  const appearance = {...defaultAppearance, ...props.appearance};

  // Every step of the route is visualized using a polyline (see ./polyline.tsx);
  // color and weight depend on the travel mode. For public transit lines
  // with established colors, the official color will be used.
  const polylines = routeSteps.map((step, index) => {
    const isWalking = step.travelMode === 'WALK';
    const color = isWalking
      ? appearance.walkingPolylineColor
      : (step?.transitDetails?.transitLine?.color ??
        appearance.defaultPolylineColor);

    return (
      <Polyline
        key={`${index}-polyline`}
        encodedPath={step.polyline.encodedPolyline}
        strokeWeight={isWalking ? 2 : 6}
        strokeColor={color}
      />
    );
  });

  // At the beginning of every step, an AdvancedMarker with a small circle is placed.
  // The beginning of the first step is omitted for a different marker.
  const stepMarkerStyle = {
    backgroundColor: appearance.stepMarkerFillColor,
    borderColor: appearance.stepMarkerBorderColor,
    width: 8,
    height: 8,
    border: `1px solid`,
    borderRadius: '50%'
  };



  return (
    <>

      {polylines}
 
    </>
  );
};

export default React.memo(Route);