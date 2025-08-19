import {Place} from './MapType'
import type {Marker} from '@googlemaps/markerclusterer';
import React, {useCallback} from 'react';
import {AdvancedMarker} from '@vis.gl/react-google-maps';

export type TreeMarkerProps = {
  tree: Place;
  onClick: (tree: Place) => void;
  setMarkerRef: (marker: Place | null, key: string) => void;
};

/**
 * Wrapper Component for an AdvancedMarker for a single tree.
 */
export const TreeMarker = (props: TreeMarkerProps) => {
  const {tree, onClick, setMarkerRef} = props;

  const handleClick = useCallback(() => onClick(tree), [onClick, tree]);
  const ref = useCallback(
    (marker : Place) =>
      setMarkerRef(marker, tree.startTime),
    [setMarkerRef, tree.startTime]
  );

  return (
    <AdvancedMarker position={tree.location} ref={ref} onClick={handleClick}>
      <span className="marker-clustering-tree">🌳</span>
    </AdvancedMarker>
  );
};