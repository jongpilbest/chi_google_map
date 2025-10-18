import React from 'react'

export default function Pin_Direction() {

    
        const Mark_Pin_set = useSelector((state) => state.contorller.selectedMark )
        const Find_index_mark_pin =  useSelector((state) => state.contorller.select_mark_index )
      
        const comment= useSelector((state)=>state.data_store.location_data,shallowEqual) 
    
    
    
      const filteredComment = useMemo(() => {
        // 여기서 문제였군 .. 
       if(comment.length>0){
         //Mark_Pin_set 수정할거 
         // 여기 true 인 인덱스만 뽑아
         return  comment.flat().filter((el)=>Mark_Pin_set[Find_index_mark_pin].has(el.id))    
       } 
    
      }, [ Mark_Pin_set]);
  return (
   <>
     <Marker_set comment={comment}></Marker_set>
        
        
               {
               Check_check>0 &&<Direction color={colors_root[Find_index_mark_pin]} key="filtered" check={true}  comment={filteredComment} polylinesRef={polylinesRef}
                ></Direction>
                }
   
      
          {
            
            <>
               <MapControl position={ControlPosition.TOP_LEFT}>
                  <AutocompleteCustom  onPlaceSelect={setSelectedPlace}>
   
                  </AutocompleteCustom>
            </MapControl>
            <Autocomplete_Result place={selectedPlace} />
      
            </>
            
          }
   </>
  )
}
