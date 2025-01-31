export const Footer = () =>{
    return (
        <>
    <footer className="player-footer">
        <div className="player-controls">
          <button className="player-btn prev-btn">⏮️</button>
          <button className="player-btn play-btn">▶️</button>
          {/* <button className="player-btn pause-btn">⏸️</button> */}
          <button className="player-btn next-btn">⏭️</button>
        </div>
        <div className="player-progress">
          <input type="range" className="progress-bar" min="0" max="100" />
          <div className="time-info">
            <span className="current-time">0:00</span>
            <span className="duration-time">3:45</span>
          </div>
        </div>
      </footer>

        </>
    )
}