import { useState } from "react";

export default function MusicBlock({ beat }) {
  const [audio] = useState(() => new Audio(beat.audio));
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = () => {
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="music-block-container">
      {/* <hr></hr> */}
        <div className="music-view">
          
          <img
            className="album-icon"
            src={beat.image}
          />

          <div className="beat-title">
            <h3>{beat.title}</h3>
          </div>

          <div className="beat-time">
            {beat.time}
          </div>

          <div className="beat-bpm">
            {beat.bpm}
          </div>

          {/* <div className="beat-tags">
            {beat.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div> */}

          <div className="beat-actions">
            <button type="button">↓</button>

            <button
              type="button"
              className="buy-button"
            >
              {beat.price}
            </button>
          </div>

          <div className="button-and-stream">

            <div className="audio-wave">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <button
              type="button"
              onClick={togglePlayback}
              className="press-play-button"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>

          </div>
      </div>
      <hr></hr>
    </div>
  );
}