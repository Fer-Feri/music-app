/** @format */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import soundImag from "../../assets/images/song.svg";
import coverImg from "../../assets/images/maroon-5-cover.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPlaylistSongs } from "../../store/slice/playlistSlice";
import Loading from "../../components/loading/Loading";
import Error from "../../components/error/Error";

const Browse = () => {
  const dispatch = useDispatch();

  const {
    playlist,
    status: playlistStatus,
    error: playlistError,
  } = useSelector((state) => state.playlist);

  useEffect(() => {
    if (playlistStatus === "idle") dispatch(fetchPlaylistSongs());
  }, [dispatch, playlistStatus]);

  if (playlistStatus === "loading") return <Loading />;
  if (playlistStatus === "failed") return <Error error={playlistError} />;

  // const songs = playlist[0] || [];

  return (
    <div>
      {playlist.map((songsArray, index) => (
        <div key={index}>
          <div className="title__mood">
            <h2 className="title">Playlist {index + 1}</h2>
          </div>
          <div className="songs">
            {songsArray.map((song) => (
              <div key={song.id} className="card-song">
                <FontAwesomeIcon icon={faPlay} />
                <div className="song__cover">
                  <img src={song.album.cover} alt={song.title} />
                </div>
                <div className="song__details">
                  <p>{song.title}</p>
                  <p>{song.artist.name}</p>
                </div>
                <div className="heartIcon">
                  <FontAwesomeIcon icon={faHeart} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Browse;
