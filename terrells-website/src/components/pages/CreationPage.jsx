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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const audioURL = URL.createObjectURL(audioFile);

    const newBeat = {
        title: title,
        bpm: Number(bpm),
        price: Number(price),
        // tags: tags.split(",").map((tag) => tag.trim()),
        time: time,
        audio_url: audioURL
    };

    try {
        const response = await fetch("http://localhost:3000/api/beats", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(newBeat)
        });

        const savedBeat = await response.json();

        console.log("Saved beat:", savedBeat);

    } catch (error) {
        console.error("Error saving beat:", error);
    }
};

  return (
    <div className="creation-container">

    <form className="add-beat-form" onSubmit={handleSubmit}>

      <h2 className="add-beat-title"> Add a Beat </h2>

      <label> Beat Name </label>

      <input
        className="property"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />

      <label> Audio File </label>

      <input
        className="property"
        type="file"
        accept="audio/*"
        onChange={handleAudioChange}
        required
      />

      <label> BPM </label>

      <input
        className="property"
        type="number"
        value={bpm}
        onChange={(event) => setBpm(event.target.value)}
        required
      />

      <label> Time </label>

      <input  
        className="property"
        type="text"
        value={time}
        readOnly
      />

      <label> Price </label>

      <input
        className="property"
        type="number"
        step="0.01"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
        required
      />

      <button type="submit">
        Add Beat
      </button>

    </form>

  </div>
  );
}