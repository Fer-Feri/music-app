/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY = "199426e94emsh63e7d6b4134a8a3p18ade5jsna6dbdc8eee19";
const API_HOST = "deezerdevs-deezer.p.rapidapi.com";

export const getSongsArtist = createAsyncThunk(
  "songs/getSongsArtist",
  async (artistName, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://deezerdevs-deezer.p.rapidapi.com/search?q=${artistName}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": API_KEY,
            "x-rapidapi-host": API_HOST,
          },
        }
      );
      if (!response.ok) throw new Error(`Https Error! Status: ${response.status}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const songsArtistSlice = createSlice({
  name: "songsArtist",
  initialState: {
    songs: [],
    status: "idle",
    error: null,
  },
  reducers: {
    resetSongs: (state) => {
      state.songs = [];
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSongsArtist.pending, (state) => {
        (state.status = "loading"), (state.error = null);
      })
      .addCase(getSongsArtist.fulfilled, (state, action) => {
        (state.status = "succeeded"), (state.songs = action.payload);
      })
      .addCase(getSongsArtist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "An Unknown Error";
      });
  },
});

export const { resetSongs } = songsArtistSlice.actions;
export default songsArtistSlice.reducer;
