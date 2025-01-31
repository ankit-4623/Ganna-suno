import { useLoaderData, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import './Play.css';
import { MdPlayCircle } from "react-icons/md";
import { MdPauseCircle } from "react-icons/md";
import { BiSolidSkipPreviousCircle } from "react-icons/bi";
import { BiSolidSkipNextCircle } from "react-icons/bi";

export const Play = () => {
    const params = useLoaderData();
    const { image, songname, artistName, filePath } = params;

    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0); // Total duration of the song
    const audioRef = useRef(null);
    const navigation = useNavigate();

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };
    const handelEnd = ()=>{
        setIsPlaying(false);
        setProgress(0);
    }

    const handleTimeUpdate = () => {
        const currentTime = audioRef.current?.currentTime || 0;
        setProgress((currentTime / duration) * 100); // Update progress as percentage
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current?.duration || 0); // Set the total duration of the audio
    };

    const handleProgressChange = (e) => {
        const newProgress = e.target.value;
        setProgress(newProgress);
        if (audioRef.current) {
            audioRef.current.currentTime = (newProgress / 100) * duration; // Set audio currentTime
        }
    };

    const handleBack = () => {
        navigation(-1);
    };

    return (
        <div className="play-container">
            <div className="rotating-image-container">
                <div
                    className={`rotating-image ${isPlaying ? "spin" : ""}`}
                    style={{
                        backgroundImage: `url(${image})`,
                    }}
                ></div>
            </div>
            <div className="song-details">
                <h2 style={{fontSize:'45px'}}>{songname}</h2>
                <h2>{artistName}</h2>
            </div>
            <div className="progress-bar-container">
                <input
                    type="range"
                    className="progress-bar"
                    value={progress}
                    max="100"
                    onChange={handleProgressChange} // Update playback on user input
                />
            </div>
            <div className="controls">
                <button className="control-button">
                    <BiSolidSkipPreviousCircle style={{ fontSize: '45px' }} />
                </button>
                <button onClick={handlePlayPause} className="control-button">
                    {!isPlaying ? (
                        <MdPlayCircle style={{ fontSize: '45px' }} />
                    ) : (
                        <MdPauseCircle style={{ fontSize: '45px' }} />
                    )}
                </button>
                <button className="control-button">
                    <BiSolidSkipNextCircle style={{ fontSize: '45px' }} />
                </button>
                <button
                    className="control-button"
                    onClick={handleBack}
                    style={{ fontSize: '10px' }}
                >
                    Back to Song List
                </button>
                <audio
                    ref={audioRef}
                    src={filePath}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata} 
                    onEnded={handelEnd}
                />
            </div>
        </div>
    );
};
