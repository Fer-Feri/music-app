/** @format */

import { createSlice } from "@reduxjs/toolkit";

const likeSongsSlice = createSlice({
  name: "likeSongs",
  initialState: {
    likeSongs: [],
  },
  reducers: {
    toggleLikeSong: (state, action) => {
      const songID = action.payload.id;
      const existingIndex = state.likeSongs.findIndex((song) => song.id === songID);

      if (existingIndex >= 0) state.likeSongs.splice(existingIndex, 1);
      else state.likeSongs.push(action.payload);
    },
  },
});

export const { toggleLikeSong } = likeSongsSlice.actions;
export default likeSongsSlice.reducer;
