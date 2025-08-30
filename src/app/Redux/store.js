// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';


// createSlice: action + reducer 통합 선언 (immer 내장됨)
const counterSlice = createSlice({
  name: 'counter',
  initialState: { url: null,
     Loading_state: false,
     current_video: null,
    },
  reducers: {
    write_new_url (state,action) {
      state.url = action.payload; // immer 덕분에 직접 수정처럼 작성 가능
    },
    Loading_state (state,action){
     state.Loading_state= action.payload
    },
    change_video_chapter(state,action){
      state.current_video= action.payload
    },
 
  }
});

const controllerSlice= createSlice({
  name:'controller',
  initialState:{
 
   Check_check: false,
   cancel_check:false,
   selectedMark:[] ,
   showDirection: false,
   show_search:false
  },
  reducers:{

     change_check_Check(state,action){
      state.Check_check= action.payload
      // 여기 클릭하면? --> 열리는 곳 지우면 안됨
      
     },

    toggleMark(state, action) {
      const id = action.payload;
      if (state.selectedMark.includes(id)) {
        state.selectedMark = state.selectedMark.filter(el => el !== id);
      } else {
        state.selectedMark.push(id);
      }
    },
     clearDirection(state) {
      state.selectedMark = [];
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



export const { write_new_url, Loading_state, change_video_chapter} = counterSlice.actions;
export const{chanage_pin_Check, change_check_Check,clearDirection,toggleMark ,change_search_state}= controllerSlice.actions;

export const store = configureStore({
  reducer: {
    url: counterSlice.reducer,
    contorller: controllerSlice.reducer
  }
});
