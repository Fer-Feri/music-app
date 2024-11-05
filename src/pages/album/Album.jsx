/** @format */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAudio } from "@fortawesome/free-solid-svg-icons";

import Loading from "../../components/loading/Loading";
import Error from "../../components/error/Error";
import { useToggleShowAll } from "../../store/helper";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchListAlbums } from "../../store/slice/albumSlice";
import { useNavigate } from "react-router-dom";
import { resetSongsAlbum } from "../../store/slice/albumTracksSlice";
import { getAlbumTracks } from "../../store/slice/albumTracksSlice";
// import { fetchSearchSongs } from "../../store/slice/searchSlice";

const Album = () => {
  const [showAll, setShowAll] = useState(false);
  const toggleShowAll = useToggleShowAll(setShowAll);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // -----------------------
  // const { searchSongs, status: searchSongsStatus } = useSelector((state) => state.searchSongs);
  // useEffect(() => {
  //   if (searchSongsStatus === "idle") dispatch(fetchSearchSongs("arash"));
  // }, [dispatch, searchSongsStatus]);
  // -----------------------

  const {
    albums,
    status: albumsStatus,
    error: albumsError,
  } = useSelector((state) => state.listsAlbum);

  useEffect(() => {
    if (albumsStatus === "idle") dispatch(fetchListAlbums());
  }, [albumsStatus, dispatch]);

  if (albumsStatus === "loading") return <Loading />;
  if (albumsStatus === "failed") return <Error error={albumsError} />;

  const handleGetTracksAlbum = (albumID, artistName) => {
    dispatch(resetSongsAlbum());
    dispatch(getAlbumTracks(albumID));
    navigate(`/songs/${artistName}/${albumID}`);
  };

  return (
    <div>
      <div className="title-content-container">
        <h2 className="title-content">
          Albums
          <FontAwesomeIcon icon={faFileAudio} />
        </h2>
        <span onClick={toggleShowAll}>{showAll ? "Show less" : "View All"}</span>
      </div>
      {/*  */}
      <div className="card-artist-container">
        {albums.slice(0, showAll ? albums.length : 6).map((album) => (
          <div
            className="card"
            key={album.id}
            onClick={() => handleGetTracksAlbum(album.id, album.artist.name)}>
            <div className="content">
              <div className="artist-img">
                <img src={album.cover_big} alt={album.name} />
              </div>
              <div className="album__card-details">
                <div className="album-details">
                  <p className="no-wrap">{album.title}</p>
                  <div className="album__name-genre">
                    <span className="no-wrap">
                      <span className="pink">Artist:</span> {album.artist.name}
                    </span>
                    <span className="no-wrap">
                      <span className="pink">Genre:</span> {album.genres?.data[0]?.name}
                    </span>
                  </div>
                  <div className="album__track-date">
                    <span>
                      <span className="pink">Tracks: </span>
                      {album.nb_tracks}
                    </span>
                    <span>
                      <span className="pink">Date: </span>
                      {album.release_date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Album;
