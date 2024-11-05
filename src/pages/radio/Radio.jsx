/** @format */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRadio } from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchRadio } from "../../store/slice/radioSlice";
import Loading from "../../components/loading/Loading";
import Error from "../../components/error/Error";
import { useHandleGetSongsArtist, useToggleShowAll } from "../../store/helper";

const Radio = () => {
  const [showAll, setShowAll] = useState(false);
  const dispatch = useDispatch();

  const { radios, status: radioStatus, error: radioError } = useSelector((state) => state.radio);

  const toggleShowAll = useToggleShowAll(setShowAll);
  const handleGetSongsArtist = useHandleGetSongsArtist();

  useEffect(() => {
    if (radioStatus === "idle") dispatch(fetchRadio());
  }, [dispatch, radioStatus]);

  if (radioStatus === "loading") return <Loading />;
  if (radioStatus === "failed") return <Error error={radioError} />;

  return (
    <div>
      <div className="title-content-container">
        <h2 className="title-content">
          Radio
          <FontAwesomeIcon icon={faRadio} />
        </h2>
        <span onClick={toggleShowAll}>{showAll ? "Show less" : "View All"}</span>
      </div>
      {/*  */}
      <div className="card-artist-container">
        {radios.slice(0, showAll ? radios.length : 6).map((radio) => (
          <div
            className="card"
            key={radio.id}
            onClick={() => handleGetSongsArtist(radio.title, radio.id)}>
            <div className="content">
              <div className="artist-img">
                <img src={radio.picture_xl} alt="" />
              </div>
              <div className="artist-details">
                <p>{radio.title}</p>
                {/* <span>36 Tracks</span> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Radio;
