import React, { useState } from "react";
import { supabase } from "../../services/supabaseClient";

const emotions = [
  "😊 Happy",
  "😔 Sad",
  "🤩 Excited",
  "😰 Anxious",
  "😌 Calm",
  "😴 Tired",
  "😤 Frustrated",
  "🙏 Grateful",
];

export default function JournalForm() {
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [description, setDescription] = useState("");
  const [energy, setEnergy] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!selectedEmotion || !description) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("journal_entries")
      .insert([
        {
          emotion_summary: [selectedEmotion],
          description: description,
          energy_level: Number(energy),
          tags: [],
          privacy_status: true,
        },
      ]);

    setLoading(false);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Entry Saved Successfully!");
      setSelectedEmotion("");
      setDescription("");
      setEnergy(5);
    }
  };

  return (
    <div
      style={{
        marginTop: "40px",
        width: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        textAlign: "center",
      }}
    >
      <h3>Emotion Summary</h3>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
        {emotions.map((emotion) => (
          <button
            key={emotion}
            onClick={() => setSelectedEmotion(emotion)}
            style={{
              padding: "8px 12px",
              borderRadius: "20px",
              border: selectedEmotion === emotion ? "2px solid #7c3aed" : "1px solid #ccc",
              backgroundColor: selectedEmotion === emotion ? "#ede9fe" : "white",
              cursor: "pointer",
            }}
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
        placeholder="What happened today? What did you feel?"
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          resize: "none",
        }}
      />

      <h3>Energy Level: {energy}</h3>
      <input
        type="range"
        min="1"
        max="10"
        value={energy}
        onChange={(e) => setEnergy(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#7c3aed",
          color: "white",
          cursor: "pointer",
        }}
      >
        {loading ? "Saving..." : "Save Today's Record"}
      </button>
    </div>
  );
}