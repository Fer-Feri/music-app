/** @format */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { setCurrentSong, setIsPaused } from "../../store/slice/currentSongSlice";
import { useCallback } from "react";
import { toggleLikeSong } from "../../store/slice/likeSongsSlice";

const Like = () => {
  const { likeSongs } = useSelector((state) => state.likeSongs);
  const dispatch = useDispatch();

  const { currentSong, isPaused, isPlaying } = useSelector((state) => state.currentSong);

  const handlePlaySong = useCallback((song) => {
    if (currentSong?.id === song.id) {
      dispatch(setIsPaused(!isPaused));
    } else {
      dispatch(setCurrentSong(song));
      dispatch(setIsPaused(false));
    }
  });

  const handleLikeSongs = (song) => {
    dispatch(toggleLikeSong(song));
  };

  return (
    <div>
      <div className="title-content-container">
        <h2 className="title-content">
          Like
          <FontAwesomeIcon icon={faHeart} />
        </h2>
      </div>
      {/*  */}
      <div className="songs">
        {likeSongs.length > 0 ? (
          likeSongs.map((song) => (
            <div className="card-song" key={song.id} onClick={() => handlePlaySong(song)}>
              {currentSong?.id === song.id && isPlaying ? (
                <div className="loading">
                  <div className="load"></div>
                  <div className="load"></div>
                  <div className="load"></div>
                  <div className="load"></div>
                </div>
              ) : (
                <FontAwesomeIcon icon={faPlay} />
              )}
              {/* cover */}
              <div className="song__cover">
                <img
                  src={`https://e-cdns-images.dzcdn.net/images/cover/${song.md5_image}/250x250.jpg`}
                  alt={song.title}
                />
              </div>
              {/* details */}
              <div className="song__details">
                <p className="no-wrap">{song.title}</p>
                <p>{song.artist.name}</p>
              </div>
              {/* icon */}
              <div
                className="heartIconLike"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLikeSongs(song);
                }}>
                <FontAwesomeIcon icon={faHeart} />
              </div>
            </div>
          ))
        ) : (
          <h2 className="no-like-song">Like Songs and Come Back 🥰</h2>
        )}
      </div>
    </div>
  );
};

export default Like;
