import React, { useState } from "react";
import axios from "axios";

const emotions = ["Happy", "Sad", "Excited", "Anxious", "Calm", "Tired"];

export default function JournalForm() {
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [description, setDescription] = useState("");
  const [energy, setEnergy] = useState(5);

  const handleSubmit = async () => {
    await axios.post(`${process.env.REACT_APP_API_URL}/journal`, {
      emotion_summary: [selectedEmotion],
      description,
      energy_level: energy,
      tags: [],
      privacy_status: true,
    });

    alert("Entry Saved!");
    setDescription("");
  };

  return (
    <div className="form">
      <h3>Emotion Summary</h3>
      <div>
        {emotions.map((emotion) => (
          <button
            key={emotion}
            onClick={() => setSelectedEmotion(emotion)}
          >
            {emotion}
          </button>
        ))}
      </div>

      <h3>Describe Your Experience</h3>
      <textarea
        rows="5"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <h3>Energy Level: {energy}</h3>
      <input
        type="range"
        min="1"
        max="10"
        value={energy}
        onChange={(e) => setEnergy(e.target.value)}
      />

      <button onClick={handleSubmit}>Save Today's Record</button>
    </div>
  );
}