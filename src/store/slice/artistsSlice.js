/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY = "199426e94emsh63e7d6b4134a8a3p18ade5jsna6dbdc8eee19";
const API_HOST = "deezerdevs-deezer.p.rapidapi.com";

const artistIds = [
  384236, 1562681, 246791, 12246, 13, 564, 1209, 92, 892, 4050205, 416239, 1188, 1147, 3469,
  5962948, 8706544, 4495513, 75798, 75491, 144227, 9635624, 12178, 145, 27, 161, 5578942, 10583405,
  9236850, 5313805, 9,
];

const fetchArtists = async (id) => {
  const response = await fetch(`https://${API_HOST}/artist/${id}`, {
    method: "GET",
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": API_HOST,
    },
  });
  if (!response.ok) throw new Error(`Http Error! Status: ${response.status}`);
  return response.json();
};

export const fetchListsArtists = createAsyncThunk(
  "artists/fetchListsArtists",
  async (_, { rejectWithValue }) => {
    try {
      const artistsListData = await Promise.all(artistIds.map(fetchArtists));
      return artistsListData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const listsArtistsSlice = createSlice({
  name: "listArtists",
  initialState: {
    listArtists: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListsArtists.pending, (state) => {
        (state.status = "loading"), (state.error = null);
      })
      .addCase(fetchListsArtists.fulfilled, (state, action) => {
        (state.status = "succeeded"), (state.listArtists = action.payload);
      })
      .addCase(fetchListsArtists.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload || "An Unknown Error");
      });
  },
});

export default listsArtistsSlice.reducer;
