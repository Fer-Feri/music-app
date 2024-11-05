/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY = "199426e94emsh63e7d6b4134a8a3p18ade5jsna6dbdc8eee19";
const API_HOST = "deezerdevs-deezer.p.rapidapi.com";

export const getAlbumTracks = createAsyncThunk(
  "albumTracks/getAlbumTracks",
  async (albumID, { rejectWithValue }) => {
    try {
      const Response = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/album/${albumID}`, {
        method: "GET",
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": API_HOST,
        },
      });
      if (!Response.ok) throw new Error(`Http Error! status: ${Response.status}`);
      const tracksAlbum = await Response.json();
      return tracksAlbum.tracks.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const albumTracksSlice = createSlice({
  name: "albumTracks",
  initialState: {
    songs: [],
    status: "idle",
    error: null,
  },
  reducers: {
    resetSongsAlbum: (state) => {
      state.songs = [];
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAlbumTracks.pending, (state) => {
        (state.status = "loading"), (state.error = null);
      })
      .addCase(getAlbumTracks.fulfilled, (state, action) => {
        (state.status = "succeeded"), (state.songs = action.payload);
      })
      .addCase(getAlbumTracks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "An Unknown Error";
      });
  },
});

export const { resetSongsAlbum } = albumTracksSlice.actions;
export default albumTracksSlice.reducer;
