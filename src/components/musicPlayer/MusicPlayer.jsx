/** @format */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackwardStep,
  faPause,
  faForwardStep,
  faRepeat,
  faShuffle,
  faVolumeHigh,
  faVolumeMute,
  faHeart,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import curSongImg from "../../assets/images/curSong.jpg";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { setCurrentSong, setIsPaused } from "../../store/slice/currentSongSlice";
import { formateTime } from "../../store/helper";
import { toggleLikeSong } from "../../store/slice/likeSongsSlice";

const MusicPlayer = () => {
  const { currentSong, isPaused } = useSelector((state) => state.currentSong);
  const { nextSong } = useSelector((state) => state.nextSong);
  const { likeSongs } = useSelector((state) => state.likeSongs);
  const dispatch = useDispatch();

  const audioRef = useRef(new Audio());
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [loopOne, setLoopOne] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [shuffledSongs, setShuffledSongs] = useState(nextSong);
  const timeBarRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (currentSong) {
      if (audio.src !== currentSong.preview) {
        audio.src = currentSong.preview;
        audio.load();
      }

      audio.addEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
      });

      audio.addEventListener("timeupdate", () => {
        setCurrentTime(audio.currentTime);
        const percent = (audio.currentTime / audio.duration) * 100;
        setProgress(percent);
      });

      if (!isPaused) {
        audio.play().catch((error) => {
          console.warn("Autoplay is not allowed by the browser:", error);
        });
      } else {
        audio.pause();
      }
    }

    return () => {
      audio.pause();
    };
  }, [currentSong, isPaused]);

  // -----------------------------------
  // -----------------------------------
  // -----------------------------------
  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      if (loopOne) {
        audio.currentTime = 0;
        audio.play();
      } else {
        const currentIndex = isShuffled
          ? shuffledSongs.findIndex((song) => song.id === currentSong.id)
          : nextSong.findIndex((song) => song.id === currentSong.id);
        const nextIndex =
          (currentIndex + 1) % (isShuffled ? shuffledSongs.length : nextSong.length); // انتخاب آهنگ بعدی
        dispatch(setCurrentSong(isShuffled ? shuffledSongs[nextIndex] : nextSong[nextIndex])); // تغییر آهنگ فعلی
        dispatch(setIsPaused(false)); // پخش آهنگ جدید
      }
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [nextSong, currentSong, isShuffled, shuffledSongs, loopOne]);

  // -----------------------------------
  // -----------------------------------
  // -----------------------------------
  const handleNextSong = () => {
    const currentIndex = nextSong.findIndex((song) => song.id === currentSong.id);

    if (nextSong.length > 1) {
      const nextIndex = (currentIndex + 1) % nextSong.length;

      // تغییر آهنگ فعلی
      dispatch(setCurrentSong(nextSong[nextIndex]));

      // اطمینان از اینکه آهنگ جدید پخش شود
      dispatch(setIsPaused(false)); // وضعیت پخش را به false تنظیم کنید
    }
  };

  // -----------------------------------
  // -----------------------------------
  // -----------------------------------
  const handlePrevSong = () => {
    const currentIndex = nextSong.findIndex((song) => song.id === currentSong.id);

    if (nextSong.length > 1) {
      const prevIndex = (currentIndex - 1 + nextSong.length) % nextSong.length;

      // تغییر آهنگ فعلی
      dispatch(setCurrentSong(nextSong[prevIndex]));

      // اطمینان از اینکه آهنگ جدید پخش شود
      dispatch(setIsPaused(false)); // وضعیت پخش را به false تنظیم کنید
    }
  };
  // -----------------------------------
  // -----------------------------------
  // -----------------------------------
  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isPaused) {
      audio.play();
      dispatch(setIsPaused(false));
    } else {
      audio.pause();
      dispatch(setIsPaused(true));
    }
  };
  // -----------------------------------
  // -----------------------------------
  // -----------------------------------
  const handleTimeBarClick = (e) => {
    const audio = audioRef.current;
    const { clientX } = e;
    const { left, width } = timeBarRef.current.getBoundingClientRect();
    const clickPosition = clientX - left;
    const newTime = (clickPosition / width) * duration;
    audio.currentTime = newTime;
  };
  // -----------------------------------
  // -----------------------------------
  // -----------------------------------
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    setIsMuted(newVolume === "0");
  };
  // -----------------------------------
  // -----------------------------------
  // -----------------------------------
  const handleMutedClick = () => {
    const newMutedStatus = !isMuted;
    setIsMuted(newMutedStatus);
    audioRef.current.muted = newMutedStatus;
  };
  // -----------------------------------
  // -----------------------------------
  // -----------------------------------
  const handleShuffleCLick = () => {
    setIsShuffled(!isShuffled);
    if (!isShuffled) {
      const shuffled = [...nextSong].sort(() => Math.random() - 0.5);
      setShuffledSongs(shuffled);
    } else {
      setShuffledSongs(nextSong);
    }
  };
  // -----------------------------------
  // -----------------------------------
  // -----------------------------------
  const handleLikeSongs = () => {
    dispatch(toggleLikeSong(currentSong));
  };

  // -----------------------------------
  // -----------------------------------
  // -----------------------------------
  return (
    <div className={`${"musicPlayer"} ${currentSong ? "" : "blur"}`}>
      <div className="songDetails">
        <div className="image">
          <img
            src={currentSong?.album?.cover_medium || curSongImg}
            alt={currentSong?.title || "No song"}
          />
        </div>
        <div className="description">
          <span className="title">{currentSong?.title || "No title"}</span>
          <span>{currentSong?.artist?.name || "Unknown artist"}</span>
        </div>
        <div
          className={`heart ${
            likeSongs.some((song) => song.id === currentSong?.id) ? "like" : ""
          }`}>
          <FontAwesomeIcon icon={faHeart} onClick={handleLikeSongs} />
        </div>
      </div>
      <div className="player">
        <FontAwesomeIcon icon={faBackwardStep} className="backIcon" onClick={handlePrevSong} />
        <div className="play-pause-icon">
          {isPaused ? (
            <FontAwesomeIcon icon={faPlay} className="pauseIcon" onClick={handlePlayPause} />
          ) : (
            <FontAwesomeIcon icon={faPause} className="pauseIcon" onClick={handlePlayPause} />
          )}
        </div>
        <FontAwesomeIcon icon={faForwardStep} className="forwardIcon" onClick={handleNextSong} />
        <span className="currentTime">{formateTime(currentTime)}</span>
        <div
          className="timeBar"
          ref={timeBarRef}
          onClick={handleTimeBarClick}
          style={{
            background: `linear-gradient(to right, #ff6347 ${
              (currentTime / duration) * 100
            }%, #ccc 0%)`,
          }}>
          <div className="progressHandle" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="endTime">{formateTime(duration)}</span>
      </div>
      <div className="volume">
        <FontAwesomeIcon
          className={`repeatIcon ${loopOne ? "active" : ""}`}
          icon={faRepeat}
          onClick={() => setLoopOne(!loopOne)}
        />
        <FontAwesomeIcon
          className={`shuffle ${isShuffled ? "active" : ""}`}
          icon={faShuffle}
          onClick={() => handleShuffleCLick()}
        />
        <FontAwesomeIcon
          className="volumeIcon"
          icon={isMuted ? faVolumeMute : faVolumeHigh}
          onClick={handleMutedClick}
        />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="volumeBar"
          style={{ "--value": volume }}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
