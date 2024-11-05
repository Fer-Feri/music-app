/** @format */

import { Route, Routes } from "react-router-dom";
import Trends from "../trends/Trends";
import SearchInput from "../../components/searchInput/SearchInput";
import Artist from "../Artist/Artist";
import Album from "../album/Album";
import Songs from "../songs/Songs";
import Store from "../store/Store";
import Radio from "../radio/Radio";
import Like from "../like/Like";
// import Browse from "../browse/Browse";
import NotFound from "../notFound/NotFound";
import Comment from "../comment/comment";
import { useState } from "react";
import SearchSongs from "../../components/search/SearchSongs";

const Content = () => {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <div className="content">
      <SearchInput setShowSearch={setShowSearch} />
      {showSearch && <SearchSongs setShowSearch={setShowSearch} />}
      <Routes>
        <Route path="/" element={<Trends />} />
        <Route path="/trends" element={<Trends />} />
        <Route path="/artist" element={<Artist />} />
        <Route path="/albums" element={<Album />} />
        <Route path="/songs" element={<Songs />} />
        <Route path="/songs/:artistName/:albumID" element={<Songs />} />
        <Route path="/store" element={<Store />} />
        <Route path="/radio" element={<Radio />} />
        <Route path="/like" element={<Like />} />
        {/* <Route path="/browse" element={<Browse />} /> */}
        <Route path="/comment" element={<Comment />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Content;
