import { useState, useEffect } from "react";
import MusicBlock from "../music/MusicBlock";
import MusicHeader from "../header/MusicHeader";

export default function mainPage() {

   const [beatList, setBeatList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/beats")
            .then((response) => response.json())
            .then((data) => {
                setBeatList(data);
            })
            .catch((error) => {
                console.error("Error fetching beats:", error);
            });
    }, []);

    return (
    <>
      <img className="cover" src="assets/TrellSettaz.png"></img>

      <div className="information-container">
        <h1 className="info-title">Vibe to TrellSettaz Beats</h1>
        <h3 className="information">
          The ultimate platform for music creators 
          and buyers to connect and transact seamlessly.</h3>
      </div>

      <div className="purpose-container">

        <div className="purpose">
          <div className="music-wave">
              {Array.from({ length: 80 }, (_, index) => (
                <span
                  key={index}
                  style={{
                    "--i": index,
                    "--duration": `${0.6 + (index % 7) * 0.15}s`,
                    "--height": `${25 + Math.abs(Math.sin(index * 0.35)) * 75}%`
                  }}
                ></span>
              ))}
          </div>
        </div>

      </div>

      <MusicHeader/>
      <div className="music-display">
        {beatList.map((beat) => (
          <MusicBlock
            key={beat.title}
            beat={beat}
          />
            ))}
      </div>
    </>
  );
}