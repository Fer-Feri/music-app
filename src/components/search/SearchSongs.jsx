/** @format */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchSongs } from "../../store/slice/searchSlice";
import Loading from "../loading/Loading";
import Error from "../error/Error";
import { useNavigate } from "react-router-dom";
import { resetSongsAlbum } from "../../store/slice/albumTracksSlice";
import { getSongsArtist } from "../../store/slice/songSlice";
import { setCurrentSong, setIsPaused } from "../../store/slice/currentSongSlice";

const SearchSongs = ({ setShowSearch }) => {
  const [userSearch, setUserSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef();

  // const { currentSong, isPaused } = useSelector((state) => state.currentSong);

  const handelGetSongsArtist = (song) => {
    console.log(song);
    dispatch(setCurrentSong(song));
    dispatch(setIsPaused(false));
    dispatch(resetSongsAlbum());
    // dispatch(getSongsArtist(song.artist.name));
    navigate(`/songs/${song?.artist?.name}/${song?.artist?.id}`);
    setShowSearch(false);
  };
  // ------------
  const {
    searchSongs,
    status: searchSongsStatus,
    error: searchSongsError,
  } = useSelector((state) => state.searchSongs);
  // ----------------
  // کنترل debounce برای کاهش فراخوانی‌های زیاد
  useEffect(() => {
    if (userSearch.length >= 3) {
      setIsLoading(true);
      const delayDebounceFn = setTimeout(() => {
        dispatch(fetchSearchSongs(userSearch))
          .then(() => setIsLoading(false)) // غیرفعال کردن loading پس از دریافت نتایج
          .catch(() => setIsLoading(false)); // غیرفعال کردن loading در صورت خطا
      }, 1000);
      return () => clearTimeout(delayDebounceFn);
    } else {
      setIsLoading(false);
    }
  }, [dispatch, userSearch]);

  // ----------------
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  // ----------------
  const handleCloseSearch = () => {
    setShowSearch(false);
  };
  // ----------------
  if (searchSongsStatus === "failed") return <Error error={searchSongsError} />;
  return (
    <div className="search-songs" onClick={() => setShowSearch(false)}>
      <div className="search-input-songs">
        <form className="search-input" onClick={(e) => e.stopPropagation()}>
          <input
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            type="text"
            placeholder="Enter keywords to search"
            ref={inputRef}
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </form>
        <span onClick={handleCloseSearch} className="close-search-input">
          X
        </span>
      </div>

      {/*  */}
      <div className="search-songs-list-container" onClick={(e) => e.stopPropagation()}>
        {isLoading ? (
          <Loading />
        ) : userSearch.length < 3 ? (
          <p className="no-results">Please search songs...</p>
        ) : searchSongs.length === 0 ? (
          <p className="no-results">Song not found</p>
        ) : (
          <>
            <ul className="search-songs-list">
              {searchSongs.slice(0, 6).map((song) => (
                <li
                  className="search-songs-item"
                  key={song.id}
                  onClick={() => handelGetSongsArtist(song)}>
                  <div className="song-img">
                    <img
                      src={`https://e-cdns-images.dzcdn.net/images/cover/${song.md5_image}/250x250.jpg`}
                      alt=""
                    />
                  </div>
                  <div className="song-content">
                    <p className="song-artist no-wrap">{song.artist.name}</p>
                    <p className="song-name no-wrap">{song.title}</p>
                  </div>
                </li>
              ))}
            </ul>
            <ul className="search-songs-list">
              {searchSongs.slice(6, 12).map((song) => (
                <li
                  className="search-songs-item"
                  key={song.id}
                  onClick={() => handelGetSongsArtist(song)}>
                  <div className="song-img">
                    <img
                      src={`https://e-cdns-images.dzcdn.net/images/cover/${song.md5_image}/250x250.jpg`}
                      alt=""
                    />
                  </div>
                  <div className="song-content">
                    <p className="song-artist no-wrap">{song.artist.name}</p>
                    <p className="song-name no-wrap">{song.title}</p>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchSongs;
