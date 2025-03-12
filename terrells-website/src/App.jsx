import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const newAudio = new Audio("wavs/Awake.mp3"); // File must be in 'public/wavs/'
    newAudio.onended = () => setIsPlaying(false); // Reset when track ends
    setAudio(newAudio);
  }, []);

  const togglePlayback = () => {
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <h1>TrellSettaz Beats</h1>
      <div className="music-column-container">
         <div className="music-block-container">
            <div className="music-block">Insert Music Here</div>
              <button onClick={togglePlayback} className="press-play-button">
                {isPlaying ? "Pause" : "Play"}
              </button>
         </div>
         <div className="music-block-container">
            <div className="music-block">Insert Music Here</div>
              <button onClick={togglePlayback} className="press-play-button">
                {isPlaying ? "Pause" : "Play"}
              </button>
         </div>
         <div className="music-block-container">
            <div className="music-block">Insert Music Here</div>
              <button onClick={togglePlayback} className="press-play-button">
                {isPlaying ? "Pause" : "Play"}
              </button>
         </div>
      </div>
      <h1>Vite + React</h1>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
