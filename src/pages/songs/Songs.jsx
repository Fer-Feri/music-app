/** @format */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongsArtist, resetSongs } from "../../store/slice/songSlice";
import Loading from "../../components/loading/Loading";
import Error from "../../components/error/Error";
import { useToggleShowAll } from "../../store/helper";
import { getAlbumTracks, resetSongsAlbum } from "../../store/slice/albumTracksSlice";
import { setCurrentSong, setIsPaused } from "../../store/slice/currentSongSlice";
import { fetchTrendingSongs } from "../../store/slice/trendingSlice";
import { toggleLikeSong } from "../../store/slice/likeSongsSlice";

const Songs = () => {
  const { artistName, albumID } = useParams();
  const [showAll, setShowAll] = useState(false);
  const toggleShowAll = useToggleShowAll(setShowAll);
  const dispatch = useDispatch();

  const { currentSong, isPlaying, isPaused } = useSelector((state) => state.currentSong);
  const {
    songs,
    status: songStatus,
    error: songError,
  } = useSelector((state) => (artistName ? state.songsArtist : state.albumTracks));
  const {
    songs: defaultSongs,
    status: defaultSongsStatus,
    error: defaultSongsError,
  } = useSelector((state) => state.trending);
  const { likeSongs } = useSelector((state) => state.likeSongs);
  // -----------------------------------
  // -----------------------------------
  // -----------------------------------
  useEffect(() => {
    dispatch(fetchTrendingSongs()); // بارگذاری آهنگ‌های ترندینگ
  }, [dispatch]);
  // -----------------------------------
  // -----------------------------------
  // -----------------------------------
  useEffect(() => {
    // ریست کردن state قبل از بارگذاری داده‌های جدید
    if (artistName) {
      dispatch(resetSongs());
      dispatch(getSongsArtist(artistName));
    } else if (albumID) {
      dispatch(resetSongsAlbum());
      dispatch(getAlbumTracks(albumID));
    }

    return () => {
      dispatch(resetSongs());
      dispatch(resetSongsAlbum());
    };
  }, [artistName, albumID, dispatch]);

  // -----------------------------------
  // -----------------------------------
  // -----------------------------------
  const handlePlaySong = useCallback((song) => {
    if (currentSong?.id === song.id) {
      dispatch(setIsPaused(!isPaused));
    } else {
      dispatch(setCurrentSong(song));
      dispatch(setIsPaused(false));
    }
  });
  // -----------------------------------
  // -----------------------------------
  // -----------------------------------
  const handleLikeSongs = (song) => {
    dispatch(toggleLikeSong(song));
  };

  const songsToDisplay = artistName || albumID ? songs : defaultSongs;

  if (songStatus === "loading" || defaultSongsStatus === "loading") return <Loading />;
  if (songError || defaultSongsError) return <Error error={songError || defaultSongsError} />;

  if (!songsToDisplay || songsToDisplay.length === 0) {
    return <Error error="No songs available" />;
  }

  return (
    <div>
      <div className="title-content-container">
        <h2 className="title-content">
          Songs
          <FontAwesomeIcon icon={faCompactDisc} />
        </h2>
        <span onClick={toggleShowAll}>{showAll ? "Show less" : "View All"}</span>
      </div>
      {/*  */}
      <div className="songs">
        {songsToDisplay.slice(0, showAll ? songsToDisplay.length : 9).map((song) => (
          <div className="card-song" key={song.id} onClick={() => handlePlaySong(song)}>
            {currentSong?.id === song.id && isPlaying ? (
              <ul className="loading">
                <li className="load"></li>
                <li className="load"></li>
                <li className="load"></li>
                <li className="load"></li>
              </ul>
            ) : (
              <FontAwesomeIcon icon={faPlay} />
            )}

            {/* Cover */}
            <div className="song__cover">
              <img
                src={`https://e-cdns-images.dzcdn.net/images/cover/${song.md5_image}/250x250.jpg`}
                alt={song.title}
              />
            </div>
            {/* Details */}
            <div className="song__details">
              <p className="no-wrap">{song.title}</p>
              <p className="no-wrap">{song.artist.name}</p>
            </div>
            {/* Heart Icon */}
            <div
              className={`heartIcon ${
                likeSongs.some((likeSong) => likeSong.id === song.id) ? "like" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleLikeSongs(song);
              }}>
              <FontAwesomeIcon icon={faHeart} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Songs;
