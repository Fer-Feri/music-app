/** @format */

import { useMemo, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Pagination } from "swiper/modules";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { setCurrentSong, setIsPaused } from "../../store/slice/currentSongSlice";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cards";

// آرایه را به صورت تصادفی مرتب می‌کند
const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const Slider = ({ songs }) => {
  const dispatch = useDispatch();
  const { currentSong, isPaused } = useSelector((state) => state.currentSong);

  // انتخاب 3 آهنگ تصادفی
  const randomSongs = useMemo(() => shuffleArray(songs).slice(0, 3), [songs]);

  const handlePlaySong = useCallback(
    (song) => {
      if (currentSong?.id === song.id) {
        // اگر آهنگ فعلی است، فقط وضعیت پخش/توقف را تغییر بده
        dispatch(setIsPaused(!isPaused));
      } else {
        // اگر آهنگ جدید است، آهنگ را تنظیم کن و پخش را شروع کن
        dispatch(setCurrentSong(song));
        dispatch(setIsPaused(false));
      }
    },
    [currentSong, isPaused, dispatch]
  );

  return (
    <div className="sliderContainer">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        direction="vertical"
        modules={[EffectCards, Pagination]}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        className="mySwiper">
        {randomSongs.map((song) => (
          <SwiperSlide key={song.id} onClick={() => handlePlaySong(song)}>
            <img
              src={`https://e-cdns-images.dzcdn.net/images/cover/${song.md5_image}/500x500-000000-80-0-0.jpg`}
              alt=""
            />
            <div className="swiper-content">
              <div className="des">
                <h2>{song.title}</h2>
                <span>
                  {song.artist.name} - Rank: {song.rank}
                </span>
              </div>
              <div className="heartIcon">
                <FontAwesomeIcon icon={faHeart} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-pagination"></div>
    </div>
  );
};

export default Slider;
