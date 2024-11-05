/** @format */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchInput = ({ setShowSearch }) => {
  const handleShowSearch = () => {
    setShowSearch(true);
  };
  return (
    <form className="search-input" onSubmit={(e) => e.preventDefault()}>
      <input
        onClick={handleShowSearch}
        type="text"
        placeholder="Enter keywords to search"
        readOnly
      />
      <FontAwesomeIcon icon={faMagnifyingGlass} />
    </form>
  );
};

export default SearchInput;
