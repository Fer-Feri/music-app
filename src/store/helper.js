/** @format */

import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetSongsAlbum } from "./slice/albumTracksSlice";
import { getSongsArtist } from "./slice/songSlice";

export const formatFanCount = (count) => {
  if (count >= 1000000000) return (count / 1000000000).toFixed(1) + "B";
  if (count >= 1000000) return (count / 1000000).toFixed(1) + "M";
  if (count >= 1000) return (count / 1000).toFixed(1) + "K";
  return count.toString();
};

export const useToggleShowAll = (SetShowAll) => {
  return useCallback(() => {
    SetShowAll((prev) => !prev);
  }, [SetShowAll]);
};

export const formateTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export const useHandleGetSongsArtist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGetSongsArtist = (name, id) => {
    dispatch(resetSongsAlbum());
    dispatch(getSongsArtist(name));
    navigate(`/songs/${name}/${id}`);
  };

  return handleGetSongsArtist;
};
