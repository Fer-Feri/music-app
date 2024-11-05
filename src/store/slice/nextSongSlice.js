/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY = "199426e94emsh63e7d6b4134a8a3p18ade5jsna6dbdc8eee19";
const API_HOST = "deezerdevs-deezer.p.rapidapi.com";

export const fetchNextSong = createAsyncThunk(
  "random/fetchRandomSong",
  async (name, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${name}`, {
        method: "GET",
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": API_HOST,
        },
      });
      if (!response.ok) throw new Error(`Https Error! Status: ${response.status}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const nextSongSlice = createSlice({
  name: "nextSong",
  initialState: {
    nextSong: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNextSong.pending, (state) => {
        (state.status = "loading"), (state.error = null);
      })
      .addCase(fetchNextSong.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.nextSong = action.payload;
      })
      .addCase(fetchNextSong.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "An Unknown Error";
      });
  },
});

export default nextSongSlice.reducer;
