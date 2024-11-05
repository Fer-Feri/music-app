/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY = "199426e94emsh63e7d6b4134a8a3p18ade5jsna6dbdc8eee19";
const API_HOST = "deezerdevs-deezer.p.rapidapi.com";
const API_URL = `https://${API_HOST}/search/?q=top`;

export const fetchTrendingSongs = createAsyncThunk(
  "trending/fetchTrendingSongs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": API_HOST,
        },
      });

      // -----------
      if (!response.ok) throw new Error("Server Error");
      // ------------
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const trendingSlice = createSlice({
  name: "trending",
  initialState: {
    songs: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingSongs.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTrendingSongs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.songs = action.payload;
      })
      .addCase(fetchTrendingSongs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default trendingSlice.reducer;
