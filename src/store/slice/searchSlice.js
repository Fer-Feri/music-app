/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY = "199426e94emsh63e7d6b4134a8a3p18ade5jsna6dbdc8eee19";
const API_HOST = "deezerdevs-deezer.p.rapidapi.com";

export const fetchSearchSongs = createAsyncThunk(
  "search/searchSongs",
  async (query, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://${API_HOST}/search?q=${query}`, {
        method: "GET",
        headers: {
          "x-rapidapi-host": API_HOST,
          "x-rapidapi-key": API_KEY,
        },
      });
      if (!response.ok) throw new Error(`Http Error! status: ${response.status}`);
      const data = await response.json();
      console.log(data.data);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const searchSongsSlice = createSlice({
  name: "searchSongs",
  initialState: {
    searchSongs: [],
    status: "idle",
    error: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchSongs.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSearchSongs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.searchSongs = action.payload;
      })
      .addCase(fetchSearchSongs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "An Unknown Error";
      });
  },
});

export default searchSongsSlice.reducer;
