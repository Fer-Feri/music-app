/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY = "199426e94emsh63e7d6b4134a8a3p18ade5jsna6dbdc8eee19";
const API_HOST = "deezerdevs-deezer.p.rapidapi.com";

const playlistID = [10312440082, 12201309851];

const fetchPlaylist = async (id) => {
  const response = await fetch(`https://${API_HOST}/playlist/${id}`, {
    method: "GET",
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": API_HOST,
    },
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};

export const fetchPlaylistSongs = createAsyncThunk(
  "genre/fetchPlaylistSongs",
  async (_, { rejectWithValue }) => {
    try {
      const data = await Promise.all(playlistID.map(fetchPlaylist));
      console.log(data.map((item) => item.tracks.data));
      return data.map((item) => item.tracks.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const playlistSlice = createSlice({
  name: "playlist",
  initialState: {
    playlist: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylistSongs.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPlaylistSongs.fulfilled, (state, action) => {
        (state.status = "succeeded"), (state.playlist = action.payload);
      })
      .addCase(fetchPlaylistSongs.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload || "An unknown error occurred");
      });
  },
});

export default playlistSlice.reducer;
