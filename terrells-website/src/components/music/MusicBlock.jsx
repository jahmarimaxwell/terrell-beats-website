import { useState } from "react";

export default function MusicBlock({ audioSrc }) {
  const [audio] = useState(new Audio(audioSrc));
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      console.log("Song is playing")
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music-block-container">
      <div className="music-view">
        <img className="album-icon" src="src/assets/TrellsSettaz-logo.jpeg"></img>
        {/* <div className="music-block">Insert Music Here</div> */}
         <div className="beat-title">
    <h3>Ancient Geometry</h3>
  </div>

  <div className="beat-time">
    01:32
  </div>

  <div className="beat-bpm">
    100
  </div>

  <div className="beat-tags">
    <span>#hiphop</span>
    <span>#trap</span>
  </div>

  <div className="beat-actions">
    <button>↓</button>
    <button className="buy-button">$29.95</button>
  </div>

          <div className="button-and-stream">
            <div class="audio-wave">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <button onClick={togglePlayback} className="press-play-button">
            {isPlaying ? "Pause" : "Play"}
            </button>
          </div>
      </div>
      {/* <hr></hr> */}
    </div>
  );
}