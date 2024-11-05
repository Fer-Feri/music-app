/** @format */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faRecordVinyl } from "@fortawesome/free-solid-svg-icons";
import { faMicrophoneLines } from "@fortawesome/free-solid-svg-icons";

import imageUser from "../../assets/images/user.jpg";
import soundImag from "../../assets/images/song.svg";

import { useDispatch, useSelector } from "react-redux";
import NoSong from "../noSong/NoSong";
import { useCallback, useEffect, useState } from "react";
import { fetchNextSong } from "../../store/slice/nextSongSlice";
import Error from "../error/Error";
import { formateTime, useToggleShowAll } from "../../store/helper";
import { setCurrentSong, setIsPaused } from "../../store/slice/currentSongSlice";
import { useTheme } from "../../store/context/changeTheme";

const Sidebar = () => {
  const [showAll, setShowAll] = useState(false);
  const toggleShowAll = useToggleShowAll(setShowAll);

  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();

  const { currentSong, isPaused } = useSelector((state) => state.currentSong);
  const {
    nextSong,
    status: nextSongStatus,
    error: nextSongError,
  } = useSelector((state) => state.nextSong);

  const [previousNextSong, setPreviousNextSong] = useState(nextSong);

  useEffect(() => {
    if (currentSong) {
      dispatch(fetchNextSong(currentSong?.artist?.name)).then((action) => {
        if (fetchNextSong.fulfilled.match(action)) {
          setPreviousNextSong(action.payload);
        }
      });
    }
  }, [currentSong, dispatch]);

  const handlePlaySong = useCallback((song) => {
    if (currentSong?.id === song.id) {
      dispatch(setIsPaused(!isPaused));
    } else {
      dispatch(setCurrentSong(song));
      dispatch(setIsPaused(false));
    }
  });

  // if (nextSongStatus === "loading") return <Loading />;
  if (nextSongStatus === "failed") return <Error error={nextSongError} />;

  return (
    <>
      {currentSong ? (
        <div className="sidebar">
          <div className="icons">
            {theme === "dark" ? (
              <FontAwesomeIcon icon={faSun} onClick={toggleTheme} />
            ) : (
              <FontAwesomeIcon icon={faMoon} onClick={toggleTheme} />
            )}
            {/* */}

            <FontAwesomeIcon icon={faBell} />
            <div className="user">
              <img src={imageUser} alt="" />
            </div>
          </div>
          <div className="currentSongPlay">
            <p className="title">
              <span>Currently Playing</span>
              <img src={soundImag} alt="" />
            </p>
            <div className="songCard">
              {/* eco music */}
              <ul className="waveMenu">
                <div className="curSongImg">
                  <img
                    src={`https://e-cdns-images.dzcdn.net/images/cover/${currentSong.md5_image}/250x250.jpg`}
                    alt=""
                  />
                </div>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              {/* title */}
              <p className="songTitle no-wrap">{currentSong.title}</p>
              <div className="songDetails">
                <p>
                  <FontAwesomeIcon icon={faMicrophoneLines} />
                  <span>{currentSong?.artist?.name}</span>
                </p>
                <p>
                  <FontAwesomeIcon icon={faRecordVinyl} />
                  <span>{currentSong?.album?.title}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="nextSong">
            {/* header title */}
            <div className="titleNextSong">
              <div className="title">
                <span>Next Songs</span>
                <img src={soundImag} alt="" />
              </div>
              <span className="viewAll" onClick={toggleShowAll}>
                {showAll ? "Show less" : "View All"}
              </span>
            </div>
            {/* list song */}
            <div className="cardContainer">
              {nextSong.slice(0, showAll ? nextSong.length : 6).map((song) => (
                <div
                  className={`card ${currentSong.id === song.id ? "active" : ""}`}
                  key={song.id}
                  onClick={() => handlePlaySong(song)}>
                  <div className="card__des">
                    <img
                      src={`https://e-cdns-images.dzcdn.net/images/cover/${song.md5_image}/250x250.jpg`}
                      alt=""
                    />
                    <div className="card__des-container">
                      <span className="card__des-title no-wrap">{song.title}</span>
                      <span className="card__des-details">
                        <span className="card__des-details-name no-wrap">{song.artist.name}</span>
                        <span>|</span>
                        <span className="card__des-details-year no-wrap">{song.album.title}</span>
                      </span>
                    </div>
                  </div>
                  <div className="card__time">
                    <span>{formateTime(song.duration)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <NoSong />
      )}
    </>
  );
};

export default Sidebar;
