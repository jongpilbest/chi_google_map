// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';


// createSlice: action + reducer 통합 선언 (immer 내장됨)
const counterSlice = createSlice({
  name: 'counter',
  initialState: { url: null,
     Loading_state: false,
     current_video: null
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
    }
  }
});




export const { write_new_url, Loading_state, change_video_chapter} = counterSlice.actions;

export const store = configureStore({
  reducer: {
    url: counterSlice.reducer
  }
});
