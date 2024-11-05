/** @format */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faImagePortrait } from "@fortawesome/free-solid-svg-icons";
import Slider from "../../components/slider/Slider";
import Loading from "../../components/loading/Loading";
import Error from "../../components/error/Error";

import { fetchTrendingSongs } from "../../store/slice/trendingSlice";
import { fetchTopArtists } from "../../store/slice/topArtistSlice";

import { formatFanCount, useHandleGetSongsArtist, useToggleShowAll } from "../../store/helper";

const Trends = () => {
  const [showAll, setShowAll] = useState(false);
  const dispatch = useDispatch();

  const toggleShowAll = useToggleShowAll(setShowAll);
  const handleGetSongsArtist = useHandleGetSongsArtist();

  const {
    songs,
    status: trendingStatus,
    error: trendingError,
  } = useSelector((state) => state.trending);
  const {
    artists,
    status: topArtistStatus,
    error: topArtistError,
  } = useSelector((state) => state.topArtists);

  useEffect(() => {
    if (trendingStatus === "idle") {
      dispatch(fetchTrendingSongs());
    }
    if (topArtistStatus === "idle") {
      dispatch(fetchTopArtists());
    }
  }, [trendingStatus, topArtistStatus, dispatch]);

  if (trendingStatus === "loading" || topArtistStatus === "loading") return <Loading />;
  if (trendingStatus === "failed") return <Error error={trendingError} />;
  if (topArtistStatus === "failed") return <Error error={topArtistError} />;

  if (!songs.length || !artists.length) return null;

  return (
    <div className="trends">
      <h2 className="title-content">
        Trending
        <FontAwesomeIcon icon={faFire} />
      </h2>
      {/* slider */}
      <Slider songs={songs} />
      {/* album */}
      <div className="trends-content__title">
        <div className="title-content-container">
          <h2 className="title-content">
            Top Artists
            <FontAwesomeIcon icon={faImagePortrait} />
          </h2>
          <span onClick={toggleShowAll}>{showAll ? "Show less" : "View All"}</span>
        </div>
      </div>
      <div className="trends-card__container">
        {artists.slice(0, showAll ? artists.length : 4).map((artist) => (
          <div
            className="trends-card"
            key={artist.id}
            onClick={() => handleGetSongsArtist(artist.name, artist.id)}>
            <img src={artist.picture} alt={artist.name} />
            <p>{artist.name}</p>
            <span>{formatFanCount(artist.nb_fan)} Fans</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trends;
