/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const artistID = [
  13, //eminem
  246791, //drake
  12246, //taylor-swift
  75798, //adele
  384236, //ed-sheeran
  9635624, //billie-eilish
  4050205, //the-weeknd
  288166, //justin-bieber
  429675, //bruno-mars
  230, //kanye-west
  564, //rihanna
  75491, //lady-gaga
];

const API_KEY = "199426e94emsh63e7d6b4134a8a3p18ade5jsna6dbdc8eee19";
const API_HOST = "deezerdevs-deezer.p.rapidapi.com";

const fetchArtists = async (id) => {
  const response = await fetch(`https://${API_HOST}/artist/${id}`, {
    method: "GET",
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": API_HOST,
    },
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};

export const fetchTopArtists = createAsyncThunk(
  "artist/fetchTopArtists",
  async (_, { rejectWithValue }) => {
    try {
      const artistsData = await Promise.all(artistID.map(fetchArtists));
      return artistsData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const topArtistsSlice = createSlice({
  name: "topArtists",
  initialState: {
    artists: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopArtists.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTopArtists.fulfilled, (state, action) => {
        (state.status = "succeeded"), (state.artists = action.payload);
      })
      .addCase(fetchTopArtists.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload || "An unknown error occurred");
      });
  },
});

export default topArtistsSlice.reducer;
