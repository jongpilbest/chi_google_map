import { useMap } from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Make_Marker } from "./Make_Marker";
import { Place } from "./MapType";

type Props = {
  places: Place[];
};

export function ClusteredMarkers({ places}: any) {
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: google.maps.marker.AdvancedMarkerElement }>({});

  const clusterer = useMemo(() => {
    if (!map) return null;
    return new MarkerClusterer({ map });
  }, [map]);

  useEffect(() => {
    if (!clusterer) return;
    clusterer.clearMarkers();
    clusterer.addMarkers(Object.values(markers));
  }, [clusterer, markers]);

  const setMarkerRef = useCallback((marker: google.maps.marker.AdvancedMarkerElement | null, key: string) => {
    setMarkers((prev) => {
      if ((marker && prev[key]) || (!marker && !prev[key])) return prev;

      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const { [key]: _, ...rest } = prev;
        return rest;
      }
    });
  }, []);

  return (
    <>
      {places?.map((p, i) => (
        <Make_Marker
          key={p.id}
          {...p}
          index={i}
          opacity={0.7}
          setMarkerRef={setMarkerRef}
        />
      ))}
    </>
  );
}
