import React from 'react'
import { useEffect,useState,useCallback} from 'react';
import { TreeMarker } from './Make_Marker';
import { useSelector } from 'react-redux';
import { MarkerClusterer } from "@googlemaps/markerclusterer";

type PointMapProps = {
  place: Place[]; // string 대신 Place[]

   onClick: (tree: Place) => void;
  setMarkerRef: (marker: Place | null, key: string) => void;
};
import {Place} from './MapType'
export default function Point_map({place}:PointMapProps ) {
  const [markers, setMarkers] = useState<{[key: string]: Place}>({});
  const [selectedTreeKey, setSelectedTreeKey] = useState<string | null>(null);


  const handleMarkerClick = useCallback((tree: Place) => {
    setSelectedTreeKey(tree.startTime);
  }, []);

  
  const setMarkerRef = useCallback((marker: Place | null, key: string) => {
    setMarkers(markers => {
      if ((marker && markers[key]) || (!marker && !markers[key]))
        return markers;

      if (marker) {
        return {...markers, [key]: marker};
      } else {
        const {[key]: _, ...newMarkers} = markers;

        return newMarkers;
      }
    });
  }, []);


  
  return (
    <>
     {place.map(tree => (
        <TreeMarker
          key={tree.startTime}
          tree={tree}
          onClick={handleMarkerClick}
          setMarkerRef={setMarkerRef}
        />
      ))}
    </>
  )
}
