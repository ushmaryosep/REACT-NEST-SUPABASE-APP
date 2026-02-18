import React from "react";
import Header from "../components/Header/Header";
import JournalForm from "../components/JournalForm/JournalForm";

export default function Home() {
  return (
    <div className="container">
      <Header />
      <JournalForm />
    </div>
  );
}