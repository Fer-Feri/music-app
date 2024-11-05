/** @format */
import { formatFanCount, useToggleShowAll } from "../../store/helper";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImagePortrait } from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchListsArtists } from "../../store/slice/artistsSlice";
import Loading from "../../components/loading/Loading";
import Error from "../../components/error/Error";
import { useNavigate } from "react-router-dom";

const Artist = () => {
  const [showAll, setShowAll] = useState(false);
  const toggleShowAll = useToggleShowAll(setShowAll);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    listArtists,
    status: artistsStatus,
    error: artistsError,
  } = useSelector((state) => state.listArtists);

  useEffect(() => {
    if (artistsStatus === "idle") dispatch(fetchListsArtists());
  }, [artistsStatus, dispatch]);

  if (artistsStatus === "loading") return <Loading />;
  if (artistsStatus === "failed") return <Error error={artistsError} />;

  return (
    <div>
      <div className="title-content-container">
        <h2 className="title-content">
          Artists
          <FontAwesomeIcon icon={faImagePortrait} />
        </h2>
        <span onClick={toggleShowAll}>{showAll ? "Show less" : "View All"}</span>
      </div>

      <div className="card-artist-container">
        {listArtists.slice(0, showAll ? listArtists.length : 15).map((artist) => (
          <div
            className="card"
            key={artist.id}
            onClick={() => navigate(`/songs/${artist.name}/${artist.id}`)}>
            <div className="content">
              <div className="artist-img">
                <img src={artist.picture_big} alt={artist.name} />
              </div>
              <div className="artist-details">
                <p>{artist.name}</p>
                <span>Album: {artist.nb_album}</span>
                <span>Fans: {formatFanCount(artist.nb_fan)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artist;
