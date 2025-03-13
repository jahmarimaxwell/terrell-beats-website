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
      <div className="music-block">Insert Music Here</div>
      <button onClick={togglePlayback} className="press-play-button">
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
}