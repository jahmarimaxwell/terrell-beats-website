import { useState } from "react";
import MusicBlock from './components/MusicBlock';
import "./App.css";

function App() {
  return (
    <>
      <h1>TrellSettaz Beats</h1>
      <div className="music-display">
        <MusicBlock audioSrc="/wavs/Awake.mp3" />
        <MusicBlock audioSrc="/wavs/Track2.mp3" />
        <MusicBlock audioSrc="/wavs/Track3.mp3" />
      </div>
    </>
  );
}

export default App;
