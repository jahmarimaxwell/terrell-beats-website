import { useState } from 'react'
import './App.css'

function App() {

  // const [count, setCount] = useState(0)

  const [audio] = useState(new Audio("/wavs/Awake.wav")); // Replace with your file path
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = () => {
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
          <div className="container">
                <div className="beginner">
                    black
                </div>
                <div className="beginner">
                    black
                </div>
                <div className="beginner">
                    black
                </div>
                <div className="button-container">
                  <button onClick={togglePlayback} className="press-play-button">
                    {isPlaying ? "Pause" : "Play"}
                  </button>
               </div>
          </div>
      <h1>Vite + React</h1>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
