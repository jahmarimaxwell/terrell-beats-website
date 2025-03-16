import { useState } from "react";
import MusicBlock from './components/MusicBlock';
import "./App.css";

function App() {
  return (
    <>
      <img src="src/assets/TrellsSettaz-logo.jpeg"></img>
      <h1 className="site-title">TrellSettaz Beats</h1>
      <div className="music-display">
        <MusicBlock audioSrc="/wavs/Awake.mp3" />
        <MusicBlock audioSrc="/wavs/Track2.mp3" />
        <MusicBlock audioSrc="/wavs/Track3.mp3" />
      </div>
    </>
  );
}

export default App;
