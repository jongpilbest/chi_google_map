import React from 'react'
import { useMap } from '@vis.gl/react-google-maps';

import { useEffect } from 'react';

import { useSelector } from 'react-redux';
export default function Border_map() {
  const map = useMap();
  const place= useSelector((state) => state.data_store.locality_place);
  
useEffect(() => {
  if (!map || !place) return;

  // 1. 지도 이동
  if (place.location) {
    map.panTo(place.location);
    map.setZoom(14);
  }

  // 2. 전체 파리 GeoJSON 로드
  fetch("/Data/Paris_boundary.json")
    .then((res) => res.json())
    .then((geojson) => {
      const targetName = place.place; 
      // 예: "Paris 10e Arrondissement"

      // 3. 이전 polygon 제거
      map.data.forEach(f => map.data.remove(f));

      // 4. targetName 과 일치하는 feature만 골라내기
      const filtered = {
        type: "FeatureCollection",
        features: geojson.features.filter(
          (f) => f.properties.nom === targetName
        ),
      };

      // 5. 찾은 구가 있으면 지도에 추가
      if (filtered.features.length > 0) {
        map.data.addGeoJson(filtered);

        // 6. 스타일 설정
        map.data.setStyle({
          strokeColor: "#0E9E86",
          strokeOpacity: 1.0,
          strokeWeight: 3,
          fillColor: "#47D6A2",
          fillOpacity: 0.5,
        });

        // 7. 해당 polygon 영역으로 auto-fit
        const bounds = new google.maps.LatLngBounds();

        filtered.features[0].geometry.coordinates[0].forEach(([lng, lat]) => {
          bounds.extend({ lat, lng });
        });

        map.fitBounds(bounds);
      }
    });
}, [map, place]);

 


  return (
    <div></div>
  )
}
