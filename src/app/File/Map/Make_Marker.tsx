
import { IoMdPin } from "react-icons/io";
import { useCallback } from 'react';
import {
useAdvancedMarkerRef,
  useMapsLibrary,
  AdvancedMarker,
  InfoWindow,
  Pin
} from "@vis.gl/react-google-maps";
import { FaRobot } from "react-icons/fa6";

 type MakeMarkerProps = {
   locaiton: {
    lat:number,
    lng:number
  }
  selected: boolean,
  onClick: (placeId: string | null) => void,
  id:string,
  describe: string,
  index:number,
  PinonClick: (placeId: string | null) => void,
  marking: boolean
};





export function Make_Marker({ locaiton, selected,onClick,id,describe,index,marking,PinonClick }: MakeMarkerProps) {
  const [markerRef, marker] = useAdvancedMarkerRef();
   useMapsLibrary('places');
     // Handle marker click to select this place
    const handleMarkerClick = useCallback(() => {
      onClick(id);
    }, [onClick, id]);

    // Handle info window close by deselecting this place
    const handleCloseClick = useCallback(() => {
      onClick(null);
    }, [onClick]);

  useMapsLibrary('places');// ✅ marker 라이브러리 로드
  

  return(
   <>
        <AdvancedMarker
          ref={markerRef}
          position={locaiton}
          onClick={handleMarkerClick}
        >
          <Pin
    background={marking?"#4DD599":"#7B7AE7"}
    glyphColor="#FFFFFF"
    borderColor="#FFFFFF"
    scale={marking?1:0.7}
    glyph={index.toString()}
  />
  </AdvancedMarker>
        {selected && (
          <InfoWindow
        
            anchor={marker}
            onCloseClick={handleCloseClick}
            minWidth={200}
            maxWidth={350}
            headerDisabled={true}>
              <div className='p-2'> 
                 <div className=' flex gap-4 items-center py-2 w-full justify-between' > 
                   <div className="flex gap-4">
                      <FaRobot className=' text-lg  text-[#A29BFE]'></FaRobot> 
      
                 <p className='text-sm font-medium text-gray-700'> From the Video</p>
                    </div> 
                  
                 <IoMdPin 
                 onClick={()=> PinonClick(id)}
                 className={`text-lg ${marking ? "text-[#4DD599]" : "text-gray-500"}`}></IoMdPin>
                 </div>
                 <hr className='border-t-1 border-gray-200'></hr>
                 <div className='py-2'> <p>{describe}</p></div>
                
                  </div>
         
                 <gmp-place-details>
                <gmp-place-details-place-request
                  place={id ?? ''}></gmp-place-details-place-request>
                <gmp-place-all-content></gmp-place-all-content>
              </gmp-place-details>
            
          </InfoWindow>
        )}
      </>
  )
 
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'gmp-place-details': React.DetailedHTMLProps<
        // @ts-expect-error PlaceDetailsElement not in types yet
        React.HTMLAttributes<google.maps.places.PlaceDetailsElement> & {
          size?: any;
        },
        // @ts-expect-error PlaceDetailsElement not in types yet
        google.maps.places.PlaceDetailsElement
      >;
      'gmp-place-details-compact': React.DetailedHTMLProps<
        // @ts-expect-error PlaceDetailsCompactElement not in types yet
        React.HTMLAttributes<google.maps.places.PlaceDetailsCompactElement> & {
          size?: any;
        },
        // @ts-expect-error PlaceDetailsCompactElement not in types yet
        google.maps.places.PlaceDetailsCompactElement
      >;
      'gmp-place-details-place-request': React.DetailedHTMLProps<
        // @ts-expect-error PlaceDetailsPlaceRequestElement not in types yet
        React.HTMLAttributes<google.maps.places.PlaceDetailsPlaceRequestElement> & {
          place: string;
        },
        // @ts-expect-error PlaceDetailsPlaceRequestElement not in types yet
        google.maps.places.PlaceDetailsPlaceRequestElement
      >;
      'gmp-place-all-content': React.DetailedHTMLProps<
        // @ts-expect-error PlaceAllContentElement not in types yet
        React.HTMLAttributes<google.maps.places.PlaceAllContentElement>,
        // @ts-expect-error PlaceAllContentElement not in types yet
        google.maps.places.PlaceAllContentElement
      >;
    }
  }
}