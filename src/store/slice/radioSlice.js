/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY = "199426e94emsh63e7d6b4134a8a3p18ade5jsna6dbdc8eee19";
const API_HOST = "deezerdevs-deezer.p.rapidapi.com";

export const fetchRadio = createAsyncThunk("radio/fetchRadio", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://${API_HOST}/radio/top`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": API_HOST,
        "x-rapidapi-key": API_KEY,
      },
    });

    const data = await response.json();
    console.log(data.data);
    return data.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const getRadioSlice = createSlice({
  name: "radio",
  initialState: {
    radios: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRadio.pending, (state) => {
        (state.status = "loading"), (state.error = null);
      })
      .addCase(fetchRadio.fulfilled, (state, action) => {
        (state.status = "succeeded"), (state.radios = action.payload);
      })
      .addCase(fetchRadio.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "An Unknown Error";
      });
  },
});

export default getRadioSlice.reducer;
