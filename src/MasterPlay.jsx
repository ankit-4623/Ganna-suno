import React, { useRef, useState, useEffect } from "react";
import { FaRegPauseCircle, FaPlayCircle } from "react-icons/fa";
import { BiSolidSkipPreviousCircle, BiSolidSkipNextCircle } from "react-icons/bi";
import Songdata from "../api/songData.json";

export const MasterPlay = () => {
  const [index, setIndex] = useState(1);
  const [currentSong, setCurrentSong] = useState(Songdata.find((item) => item.id === index));
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  useEffect(() => {
    // Update duration when audio metadata is loaded
    const handleLoadedMetadata = () => {
      setDuration(audioRef.current.duration);
    };

    // Update current time during playback
    const handleTimeUpdate = () => {
      setCurrentTime(audioRef.current.currentTime);
    };

    const audio = audioRef.current;
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [currentSong]);

  const handleNext = () => {
    const nextIndex = index + 1 > Songdata.length ? 1 : index + 1;
    const nextSong = Songdata.find((item) => item.id === nextIndex);
    setIndex(nextIndex);
    setCurrentSong(nextSong);
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current.play();
      }, 0);
    }
  };

  const handlePrevious = () => {
    const prevIndex = index - 1 < 1 ? Songdata.length : index - 1;
    const prevSong = Songdata.find((item) => item.id === prevIndex);
    setIndex(prevIndex);
    setCurrentSong(prevSong);
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current.play();
      }, 0);
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e) => {
    const time = (e.target.value / 100) * duration;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="master_play">
      <div className="wave" id="wave">
        <div className="wave1"></div>
        <div className="wave1"></div>
        <div className="wave1"></div>
      </div>
      <img src={currentSong.image} alt={currentSong.songname} className="h-16 w-16" />
      <h5 id="title" className="text-lg">
        {currentSong.songname}
        <div className="subtitle text-sm text-gray-400">{currentSong.artistName}</div>
      </h5>
      <div className="icon flex gap-4">
        <BiSolidSkipPreviousCircle 
          className="icon-button text-2xl cursor-pointer" 
          onClick={handlePrevious} 
        />
        {!isPlaying ? (
          <FaPlayCircle 
            className="icon-button text-2xl cursor-pointer" 
            onClick={handlePlayPause} 
          />
        ) : (
          <FaRegPauseCircle 
            className="icon-button text-2xl cursor-pointer" 
            onClick={handlePlayPause} 
          />
        )}
        <audio 
          ref={audioRef}
          src={currentSong.filePath}
          onEnded={handleNext}
        />
        <BiSolidSkipNextCircle 
          className="icon-button text-2xl cursor-pointer" 
          onClick={handleNext} 
        />
      </div>
      <span id="currentStart">{formatTime(currentTime)}</span>
      <div className="bar w-full max-w-md">
        <input 
          type="range" 
          id="seek" 
          min="0" 
          max="100" 
          value={(currentTime / duration) * 100 || 0}
          onChange={handleSeek}
          className="w-full"
        />
        <div 
          className="bar2" 
          style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
        ></div>
        <div 
          className="dot" 
          style={{ left: `${(currentTime / duration) * 100 || 0}%` }}
        ></div>
      </div>
      <span id="currentEnd">{formatTime(duration)}</span>
      <div className="vol w-32">
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={volume * 100}
          onChange={handleVolumeChange}
          className="w-full"
        />
        <div 
          className="vol_bar" 
          style={{ width: `${volume * 100}%` }}
        ></div>
        <div 
          className="dot" 
          style={{ left: `${volume * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default MasterPlay;