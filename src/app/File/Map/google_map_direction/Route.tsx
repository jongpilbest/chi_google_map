import React, { useEffect, useRef, useState } from "react";
import { Polyline } from "./Polylines";
import { useMap } from "@vis.gl/react-google-maps";

export default function Route({
  apiClient,
  origin,
  destination,
  routeOptions,
  appearance,
  onDurationCalculated,
}) {
  const [route, setRoute] = useState<any>(null);
  const map = useMap();
  const didRun = useRef(false); // ✅ 실행 여부 체크

  useEffect(() => {
    if (!map || didRun.current) return;
    didRun.current = true; // ✅ 최초 한 번만 실행

    const route_go = async () => {
      const res = await fetch("/api/itineray", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin: { location: origin },
          destination: { location: destination },
          ...routeOptions,
        }),
      });

      const data = await res.json();
      const [route] = data.routes;
      setRoute(route);

      const routeSteps: any[] = route.legs[0].steps;
      const Total_time = { WALK: 0, TRANSIT: 0 };
      routeSteps.forEach((step) => {
        const sec = parseInt(step.staticDuration.replace("s", ""), 10);
        if (!isNaN(sec)) Total_time[step.travelMode] += sec;
      });

      onDurationCalculated?.(Total_time);
    };

    route_go();
  }, [map]);

  if (!route) return null;

  const routeSteps: any[] = route.legs[0].steps;

  const polylines = routeSteps.map((step, index) => {
    const isWalking = step.travelMode === "WALK";
    const color = isWalking
      ? appearance.walkingPolylineColor
      : step?.transitDetails?.transitLine?.color ??
        appearance.defaultPolylineColor;

    return (
      <Polyline
        key={`${index}-polyline`}
        encodedPath={step.polyline.encodedPolyline}
        strokeWeight={isWalking ? 2 : 6}
        strokeColor={color}
      />
    );
  });

  return <>{polylines}</>;
}
