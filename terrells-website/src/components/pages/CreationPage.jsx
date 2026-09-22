import beats from "../../beats.js";
import MusicBlock from "../music/MusicBlock.jsx";

export default function MusicPage() {
  return (
    <div className="beat-list">
      {beats.map((beat) => (
        <MusicBlock
          key={beat.title}
          beat={beat}
        />
      ))}
    </div>
  );
}