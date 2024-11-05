/** @format */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { faImagePortrait } from "@fortawesome/free-solid-svg-icons";
import { faFileAudio } from "@fortawesome/free-solid-svg-icons";
import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faRadio } from "@fortawesome/free-solid-svg-icons";
import { faGhost } from "@fortawesome/free-solid-svg-icons";

import logoImg from "../../assets/images/favicon.png";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      {/* logo */}
      <div className="logo">
        <img src={logoImg} alt="" />
        <span>MusicApp</span>
      </div>
      {/* library links */}
      <ul className="library">
        <p>Library</p>
        <div className="links">
          <Link to="/trends">
            <FontAwesomeIcon icon={faFire} />
            <span>Trends</span>
          </Link>
          <Link to="/artist">
            <FontAwesomeIcon icon={faImagePortrait} />
            <span>Artist</span>
          </Link>
          <Link to="/albums">
            <FontAwesomeIcon icon={faFileAudio} />
            <span>Albums</span>
          </Link>
          <Link to="/songs">
            <FontAwesomeIcon icon={faCompactDisc} />
            <span>Songs</span>
          </Link>
        </div>
      </ul>
      {/* discover links */}
      <ul className="library">
        <p>Discover</p>
        <div className="links">
          <Link to="/store">
            <FontAwesomeIcon icon={faStore} />
            <span>Store</span>
          </Link>
          <Link to="/like">
            <FontAwesomeIcon icon={faHeart} />
            <span>Like</span>
          </Link>
          <Link to="/radio">
            <FontAwesomeIcon icon={faRadio} />
            <span>Radio</span>
          </Link>
          <Link to="/comment">
            <FontAwesomeIcon icon={faGhost} />
            <span>Browse</span>
          </Link>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
