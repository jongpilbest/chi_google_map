// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';



import { enableMapSet } from "immer";
import { act } from 'react';

enableMapSet(); // ✅ Immer에 Map/Set 지원 켜기
// createSlice: action + reducer 통합 선언 (immer 내장됨)


const counterSlice = createSlice({
  name: 'counter',
  initialState: { 
     Loading_state: false,
     current_video: null,
     url_list:[],
     url_current_index:0,
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
    console.log(action.payload)
    // 저장한 곳의 url 을 주세요라는 의미 <- handler 작업이라고 생각하면됨 
     if(state.url_current_index!= action.payload) {
          state.url_current_index=action.payload
          state.url_current = state.url_list[action.payload]
     }
  
     // index 을 얘내가 아나?
   }
 
  }
});

const controllerSlice= createSlice({
  name:'controller',
  initialState:{
 
   Check_check: -1,
   select_mark_index:0,
   cancel_check:false,
   selectedMark:[] ,
   showDirection: false,
   show_search:false,
   original_route_data:[],
   Duration_Time:[]
  },
  reducers:{
    chnage_original_route_data(state,action){
      state.original_route_data=action.payload
    }  ,
    change_selected_mark(state,action){
      state.select_mark_index=action.payload
     
      
    },

     change_check_Check(state,action){
      state.Check_check+=1
      
     },
     add_Selected_mark(state,action){
      // 나중에 쓸거 지금 바빠서 못함
      state.selectedMark=action.payload;
     }
     ,
    toggleMark(state, action) {
      const id = action.payload.i
      //이거 걍 추후에 쓴다고 가정하고 지금은 만지지 말자
    ;
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
      state.Check_check= -1;
    },
       change_search_state(state,action){
          state.show_search= action.payload
          state.Check_check=0;
          // toggle 이니까 이딴식으로 해도 상관없는거 아님?
       } ,

     Time_Duration(state,action){
      if(action.payload.first>0){
          state.Duration_Time = Array.from({ length: action.payload.first }, () => ({}));
        return;

      }
      if( action.payload.first==-1){
 const time= action.payload.time;
      const index= action.payload.index;


      state.Duration_Time[index]=time;
      }
     

     
    }  

    }
})



const data_store_slice= createSlice({
  name:'data_Store',
  initialState:{
      map_click:false,
      clicked_marker_id: null, 
     location_data:{},
     zoom_in_place:null,
     locality_place:{
      place:null,
      location:null
     },
    like_location: {},
    poluline_location:{
      "Day":[],
      "Polyline":[]
    },
    color_location:{}
  },
  reducers:{ 
   data_Store_change(state, action) {
      const index = action.payload.index;
      const data = action.payload.data;

      data.map((el) => {
        if (!state.location_data[el['id']]) {
          state.location_data[el['id']] = [];
        }

        state.location_data[el['id']].push([{ ...el, index: index }]);
      });
    }, // 
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
    },
    map_click_toggle(state,action){
      if (state.clicked_marker_id === action.payload) {
        // 같은 걸 다시 클릭하면 닫기
        state.map_click = false;
        state.clicked_marker_id = null;
      } else {
        state.map_click = true;
        state.clicked_marker_id = action.payload;
      }
    },
    personal_like_place(state,action){
      const key= action.payload.key;
      const location= action.payload.location;
      if(state.like_location[key]){
          delete state.like_location[key]
      }
      else{
     state.like_location[key]=location
      }
    },
    personal_color_place(state,action){
      
       state.color_location[action.payload.key]=action.payload.index;


    },

    set_polyline_destion(state,action){
      state.poluline_location= {
        "Day":action.payload.Day,
        "Polyline":action.payload.Polyline

    }}

  }
})



export const { write_new_url, Loading_state, change_video_chapter,url_plus,url_out} = counterSlice.actions;
export const{Time_Duration,chnage_original_route_data,chanage_pin_Check, change_check_Check,change_selected_mark,clearDirection,toggleMark ,change_search_state ,add_Selected_mark}= controllerSlice.actions;
export const {personal_color_place,set_polyline_destion, data_Store_change,filter_data_location,filter_zoom_in,locality_place_change,map_click_toggle,personal_like_place}= data_store_slice.actions
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