/** @format */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore } from "@fortawesome/free-solid-svg-icons";

const Store = () => {
  return (
    <div>
      <div className="title-content-container">
        <h2 className="title-content">
          Store
          <FontAwesomeIcon icon={faStore} />
        </h2>
      </div>
      {/*  */}
      <div className="store__container">
        <div className="store__card_box">
          <span>Basic</span>
          <div className="store__card_content">
            <ul>
              <li>Access to limited content or features.</li>
              <li>Ads may be included in this plan.</li>
              <li>Lower-quality streaming or service.</li>
              <li>Fewer offline downloads or limited device access</li>
            </ul>
          </div>
          <button className="store__button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24">
              <path d="m18 0 8 12 10-8-4 20H4L0 4l10 8 8-12z"></path>
            </svg>
            Unlock Bas
          </button>
        </div>
        <div className="store__card_box">
          <span>Premium</span>
          <div className="store__card_content">
            <ul>
              <li>Access to all premium content or features.</li>
              <li>Ad-free experience.</li>
              <li>Highest streaming quality or best service.</li>
              <li>Unlimited offline downloads.</li>
              <li>Access on multiple devices simultaneously.</li>
              <li>Priority customer support and exclusive perks (if applicable).</li>
            </ul>
          </div>
          <button className="store__button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24">
              <path d="m18 0 8 12 10-8-4 20H4L0 4l10 8 8-12z"></path>
            </svg>
            Unlock Prem
          </button>
        </div>
        <div className="store__card_box">
          <span>Standard</span>
          <div className="store__card_content">
            <ul>
              <li>Access to more content or features compared to the basic.</li>
              <li>Fewer or no ads.</li>
              <li>Higher-quality streaming or better service.</li>
              <li>More offline downloads and multi-device support.</li>
            </ul>
          </div>
          <button className="store__button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24">
              <path d="m18 0 8 12 10-8-4 20H4L0 4l10 8 8-12z"></path>
            </svg>
            Unlock Std
          </button>
        </div>
      </div>
    </div>
  );
};

export default Store;
