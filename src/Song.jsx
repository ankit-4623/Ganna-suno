import React, { useState, useRef } from "react";
import { FaRegCirclePlay } from "react-icons/fa6";
import { FaRegPauseCircle } from "react-icons/fa";
import { MasterPlay } from "./MasterPlay";


export const SongCard = ({ SongData, onChangeSong }) => {
  const { image, songname, artistName, id, filePath } = SongData;
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isanother,setAnother] = useState(null);
  
      
  const handleClick = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);

  };

  return (
    <>
      <div className="menu_song">
        <ul>
          <li className="songItem">
            <span>{id}</span>
            <img src={image} alt={songname} />
            <h5>
              {songname} <br />
              <div className="subtitle">{artistName}</div>
            </h5>
            {!isPlaying ? (
              <FaRegCirclePlay
                style={{ color: "white", cursor: "pointer" }}
                onClick={handleClick}
              />
            ) : (
              <FaRegPauseCircle
                style={{ color: "white", cursor: "pointer" }}
                onClick={()=>handleClick(id)}
              />
            )}
            {/* Audio element for playback */}
            <audio ref={audioRef} src={filePath} />
          </li>
        </ul>
      
      <MasterPlay/>

</div>
 
    </>
  );
};
