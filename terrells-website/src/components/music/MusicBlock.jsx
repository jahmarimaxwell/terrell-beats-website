import { useState, useEffect, useRef } from "react";

export default function MusicBlock({ beat }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Get audio file from PostgreSQL
  const audioSource = beat.audio_file || beat.audio;

  useEffect(() => {
    if (!audioSource) {
      audioRef.current = null;
      setIsPlaying(false);
      return;
    }

    const audio = new Audio(audioSource);
    audioRef.current = audio;

    const handleEnded = () => {
      setIsPlaying(false);
    };

    const handleError = () => {
      console.error("Unable to load audio:", audioSource);
      setIsPlaying(false);
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.pause();
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.removeAttribute("src");
      audio.load();

      if (audioRef.current === audio) {
        audioRef.current = null;
      }
    };
  }, [audioSource]);

  const togglePlayback = async () => {
    const audio = audioRef.current;

    if (!audio) {
      console.error("No audio file found for:", beat.title);
      return;
    }

    if (!audio.paused) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="music-block-container">
        <div className="music-view">

          <div className="beat-title">
            <h3>{beat.title}</h3>
          </div>

          <div className="beat-time">
            {beat.time}
          </div>

          <div className="beat-bpm">
            {beat.bpm}
          </div>

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