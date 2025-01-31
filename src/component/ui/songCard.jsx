import { useNavigate } from "react-router-dom";
import "./songCard.css";
import { FaCirclePlay } from "react-icons/fa6";

/* eslint-disable react/prop-types */
export const Card = ({ curSong }) => {
  const { image, id, songname, artistName } = curSong;
  const navigate = useNavigate();

  const handlePlayPause = () => {
    // Navigate to the play page with the song ID
    navigate(`/${id}`);
  };

  const handleStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "3rem",
    color: "white",
    cursor: "pointer",
  };

  return (
    <li className="song-card">
      <div className="song-info">
        {/* <p className="song-songname">{songname}</p>
        <p className="song-artist">{artistName}</p> */}
        <button className="ticket__buy-btn">Add To Favourite</button>
      </div>
      <div className="song-image-container">
        <div className="poster-container">
          <img src={image} className="poster" alt={songname} />
          <FaCirclePlay onClick={handlePlayPause} style={handleStyle} />
        </div>
      </div>
    </li>
  );
};
