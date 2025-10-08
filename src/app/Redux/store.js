// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';


import { enableMapSet } from "immer";

enableMapSet(); // ✅ Immer에 Map/Set 지원 켜기
// createSlice: action + reducer 통합 선언 (immer 내장됨)


const counterSlice = createSlice({
  name: 'counter',
  initialState: { 
     Loading_state: false,
     current_video: null,
     url_list:[],
     url_current_index:-1,
     url_current: null ,
    },
  reducers: {
  
    Loading_state (state,action){
     state.Loading_state= action.payload
    },
    change_video_chapter(state,action){
      // 비디오 어디 부분에서 보고 싶은지 저장하고 변경하라는거네
      // 얘는 굳이 변경안해도 될거같음

      state.current_video= action.payload
    },
     url_plus(state,action){
    // 이미 존재하고 있으면 다시 넣지 말라는 것을 제공함
    
       state.url_list.push(action.payload)
       state.url_current_index +=1
       state.url_current= state.url_list[state.url_list.length-1]
      
   },
   url_out(state,action){
    // 저장한 곳의 url 을 주세요라는 의미 <- handler 작업이라고 생각하면됨 
    if (action.payload.up) {

      state.url_current_index = Math.min(
        state.url_list.length - 1,
        state.url_current_index + 1
      );

    } else if (action.payload.down) {
      state.url_current_index = Math.max(0, state.url_current_index-1);
    }
    state.url_current = state.url_list[state.url_current_index] ?? null;
     // index 을 얘내가 아나?
   }
 
  }
});

const controllerSlice= createSlice({
  name:'controller',
  initialState:{
 
   Check_check: false,
   select_mark_index:0,
   cancel_check:false,
   selectedMark:[new Set(),new Set(), new Set(), new Set()] ,
   showDirection: false,
   show_search:false
  },
  reducers:{
      
    change_selected_mark(state,action){
      state.select_mark_index=action.payload
    },

     change_check_Check(state,action){
      state.Check_check= !state.Check_check
      
     },
     add_Selected_mark(state,action){
      // 나중에 쓸거 지금 바빠서 못함
      state.selectedMark.add(new Set());
     }
     ,
    toggleMark(state, action) {
      const id = action.payload.id;
      const index= action.payload.index
       if (state.selectedMark[index].has(id)) {
       state.selectedMark[index].delete(id);   // 있으면 제거
     } else {
       state.selectedMark[index].add(id);      // 없으면 추가
     }
    },
     clearDirection(state) {
      state.selectedMark = new Set();
      state.showDirection = false;
      state.Check_check= false;
    },
       change_search_state(state,action){
          state.show_search= action.payload
          state.Check_check=false;
          // toggle 이니까 이딴식으로 해도 상관없는거 아님?
       } 

    }
})



const data_store_slice= createSlice({
  name:'data_Store',
  initialState:{
     location_data:[[]],
     zoom_in_place:null,
     locality_place:{
      place:null,
      location:null
     },
     // 서버에서 들어오는 데이터 && autocompleted 에서 들어오는 데이터를 모아 놓는 곳이라고 생각하슈 
     // 근데 장소가 겹치면 쩝 어떻게 해야될지 모르겟음.. 알긴 알겠는데 이걸 따로 저장^^;; 해야되서 우선은 놔두는걸로...  
     // 우선은 여기에 걍 데이터 넣어놓고 나중에 고민하고 수정하는것으로 하기 


  },
  reducers:{ 
   data_Store_change(state,action){
  
    if(action.payload.index==0){
        state.location_data[action.payload.index].push(action.payload.data)
    }
    else{
        state.location_data.push(action.payload.data)
    }
   },
   filter_data_location(state,action){
     
    if(state.location_data.length>0){
      // 뭔가 들어가 있으먄 처리해달라는 코드 
    
      const filter_data= state.location_data.flat().filter((el)=>el.googlePlace==action.payload.name)
      // 필터링 된 데이터가 되었습니다. 
      state.zoom_in_place= filter_data
  
  

    }

   },
    locality_place_change(state,action){
     state.locality_place= {
      place:action.payload.place,
      location:action.payload.location
     }
    }


  }
})



export const { write_new_url, Loading_state, change_video_chapter,url_plus,url_out} = counterSlice.actions;
export const{chanage_pin_Check, change_check_Check,change_selected_mark,clearDirection,toggleMark ,change_search_state ,add_Selected_mark}= controllerSlice.actions;
export const {data_Store_change,filter_data_location,filter_zoom_in,locality_place_change}= data_store_slice.actions
export const store = configureStore({
  reducer: {
    url: counterSlice.reducer,
    contorller: controllerSlice.reducer,
    data_store: data_store_slice.reducer

  },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,   // ✅ Set 허용
    }),
});
