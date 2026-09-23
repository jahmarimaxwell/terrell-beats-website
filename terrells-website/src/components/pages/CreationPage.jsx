import { useState } from "react";
import beats from "../../beats.js";
import MusicBlock from "../music/MusicBlock.jsx";

export default function CreationPage() {

  const [beatList, setBeatList] = useState(beats);

  const [title, setTitle] = useState("");
  const [bpm, setBpm] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState("");
  const [audioFile, setAudioFile] = useState(null);

  const handleAudioChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setAudioFile(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!audioFile) {
      alert("Please select an audio file.");
      return;
    }

    const audioURL = URL.createObjectURL(audioFile);

    const newBeat = {
      title: title,
      time: "00:00",
      bpm: bpm,
      tags: tags.split(",").map((tag) => tag.trim()),
      price: `$${price}`,
      image: "",
      audio: audioURL
    };

    setBeatList((currentBeats) => [
      ...currentBeats,
      newBeat
    ]);

    setTitle("");
    setBpm("");
    setPrice("");
    setTags("");
    setAudioFile(null);

    event.target.reset();
  };

  return (
    <div className="creation-container">

    <form className="add-beat-form" onSubmit={handleSubmit}>

      <h2>Add a Beat</h2>

      <label>Beat Name</label>

      <input
        className="property"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />

      <label>Audio File</label>

      <input
        className="property"
        type="file"
        accept="audio/*"
        onChange={handleAudioChange}
        required
      />

      <label>BPM</label>

      <input
        className="property"
        type="number"
        value={bpm}
        onChange={(event) => setBpm(event.target.value)}
        required
      />

      <label>Price</label>

      <input
        className="property"
        type="number"
        step="0.01"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
        required
      />

      <label>Tags</label>

      <input
        className="property"
        type="text"
        placeholder="hiphop, trap, dark"
        value={tags}
        onChange={(event) => setTags(event.target.value)}
      />

      <button type="submit">
        Add Beat
      </button>

    </form>

  </div>
  );
}