import { useState } from "react";

export default function CreationPage({ beatList, setBeatList }) {

  const [title, setTitle] = useState("");
  const [bpm, setBpm] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [time, setTime] = useState("00:00");

  
const handleAudioChange = (event) => {
  const file = event.target.files[0];

  if (!file) return;

  setAudioFile(file);

  // Create an audio element to read the file's duration.
  const audio = new Audio();

  audio.onloadedmetadata = () => {
    const duration = Math.floor(audio.duration);

    // Convert seconds into minutes and seconds.
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    // Format as MM:SS, such as 03:45.
    const formattedTime =
      `${String(minutes).padStart(2, "0")}:` +
      `${String(seconds).padStart(2, "0")}`;

    setTime(formattedTime);
  };

  audio.onerror = () => {
    setTime("00:00");
  };

  audio.src = URL.createObjectURL(file);
};


  const convertAudioToBase64 = (file) => {
  return new Promise((resolve, reject) => {

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = (error) => {
      reject(error);
    };

  });
};

  
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!audioFile) {
    alert("Please select an audio file.");
    return;
  }

  // Temporary audio URL
  const audioURL = URL.createObjectURL(audioFile);

  try {
    // Save beat to PostgreSQL through Express
    const response = await fetch("http://localhost:3000/api/beats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        title,
        time,
        bpm: Number(bpm),
        price: Number(price),
        audio_file: audioURL
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to save beat:", data);
      return;
    }

    console.log("Saved beat:", data);

    alert("Beat saved successfully!");

  } catch (error) {
    console.error("Error saving beat:", error);
  }
};

  return (
    <div className="creation-container">

    <form className="add-beat-form" onSubmit={handleSubmit}>

      <h2 className="add-beat-title"> Add a Beat </h2>

      <label className="input-title"> Beat Name </label>

      <input
        className="input-field"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />

      <label className="input-title"> Audio File </label>

      <input
        className="input-field"
        type="file"
        accept="audio/*"
        onChange={handleAudioChange}
        required
      />

      <label className="input-title"> BPM </label>

      <input
        className="input-field"
        type="number"
        value={bpm}
        onChange={(event) => setBpm(event.target.value)}
        required
      />

      <label className="input-title"> Time </label>

      <input  
        className="input-field"
        type="text"
        value={time}
        readOnly
      />

      <label className="input-title"> Price </label>

      <input
        className="input-field"
        type="number"
        step="0.01"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
        required
      />

      <button className="add-beat-button" type="submit">
        Add Beat
      </button>

    </form>

  </div>
  );
}