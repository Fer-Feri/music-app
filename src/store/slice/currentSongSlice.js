/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSong: null,
  isPaused: true,
  isPlaying: false,
};

const currentSongSlice = createSlice({
  name: "currentSong",
  initialState,
  reducers: {
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
      state.isPaused = false; // وقتی آهنگ جدید انتخاب می‌شود، پخش شود
      state.isPlaying = true;
    },
    setIsPaused: (state, action) => {
      state.isPaused = action.payload;
    },
  },
});

export const { setCurrentSong, setIsPaused } = currentSongSlice.actions;
export default currentSongSlice.reducer;
