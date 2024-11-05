/** @format */

import { configureStore } from "@reduxjs/toolkit";
import trendingReducer from "./slice/trendingSlice";
import topArtistsReducer from "./slice/topArtistSlice";
import currentSongReducer from "./slice/currentSongSlice";
import listArtistReducer from "./slice/artistsSlice";
import listsAlbumReducer from "./slice/albumSlice";
import songsArtistSlice from "./slice/songSlice";
import albumTracksSlice from "./slice/albumTracksSlice";
import nextSongSlice from "./slice/nextSongSlice";
import likeSongsSlice from "./slice/likeSongsSlice";
import getRadioSlice from "./slice/radioSlice";
import playlistSlice from "./slice/playlistSlice";
import searchSongsSlice from "./slice/searchSlice";

const store = configureStore({
  reducer: {
    trending: trendingReducer,
    topArtists: topArtistsReducer,
    currentSong: currentSongReducer,
    listArtists: listArtistReducer,
    listsAlbum: listsAlbumReducer,
    songsArtist: songsArtistSlice,
    albumTracks: albumTracksSlice,
    nextSong: nextSongSlice,
    likeSongs: likeSongsSlice,
    radio: getRadioSlice,
    playlist: playlistSlice,
    searchSongs: searchSongsSlice,
  },
});

export default store;
