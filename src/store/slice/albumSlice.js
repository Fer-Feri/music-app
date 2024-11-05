/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY = "199426e94emsh63e7d6b4134a8a3p18ade5jsna6dbdc8eee19";
const API_HOST = "deezerdevs-deezer.p.rapidapi.com";

const albumsID = [
  1006449, 1056791, 7382101, 435831817, 14830833, 41645091, 50389652, 15836838, 93509192, 390068977,
  14827087, 1154565, 571010171, 7653891, 1154919,
];

const fetchAlbums = async (id) => {
  try {
    const response = await fetch(`https://${API_HOST}/album/${id}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": API_HOST,
      },
    });
    if (!response.ok) throw new Error(`Https Error! Status: ${response.status}`);
    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchListAlbums = createAsyncThunk(
  "album/fetchListsAlbum",
  async (_, { rejectWithValue }) => {
    try {
      const albumListsData = await Promise.all(albumsID.map(fetchAlbums));
      return albumListsData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const listAlbumsSlice = createSlice({
  name: "listAlbums",
  initialState: {
    albums: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListAlbums.pending, (state) => {
        (state.status = "loading"), (state.error = null);
      })
      .addCase(fetchListAlbums.fulfilled, (state, action) => {
        (state.status = "succeeded"), (state.albums = action.payload);
      })
      .addCase(fetchListAlbums.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload || "An Unknown Error");
      });
  },
});

export default listAlbumsSlice.reducer;
