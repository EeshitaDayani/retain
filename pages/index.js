import React, { useState } from "react";
import UserAttemptRecorder from "../src/components/UserAttemptRecorder";
import Scorecard from "../src/components/Scorecard";
import { UploadFile } from "@/src/components/UploadFile";

export default function Home() {
  const [selectedInput, setSelectedInput] = useState("");
  const [transcript, setTranscript] = useState("");
  const [showEditableField, setShowEditableField] = useState(false);

  const handleChange = (event, newInput) => {
    if (newInput !== null) {
      setSelectedInput(newInput);
      setShowEditableField(false); // Hide the editable field when switching input type
    }
  };

  const handleTranscriptSubmit = async () => {
    // Here, you can send the transcript to your server if needed.
    const extractedTextResponse = await fetch(
      "http://localhost:8080/api/extractedText",
      {
        method: "GET",
      }
    );

    const data = await extractedTextResponse.json();
    setTranscript(data.message);
    setShowEditableField(true);
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      try {
        fetch(`http://localhost:8080/api/textInput?value=${transcript}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.error("Error sending data to the server:", error);
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fffbf6",
        minHeight: "100vh",
        color: "#fffbf6",
      }}
    >
      <h1 style={{ color: "#18756e", fontSize: "50px", fontWeight: "bolder" }}>
        retain
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-evenly",
          marginTop: "40px",
        }}
      >
        <UploadFile handleChange={handleChange} handleTranscriptSubmit={handleTranscriptSubmit} handleEnterKeyPress={handleEnterKeyPress} />
        
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "#18756e",
            border: "1px solid #18756e",
            padding: "25px",
            borderRadius: "5px",
          }}
        >
          <h2 style={{ color: "#18756e" }}>press to start recording</h2>
          <UserAttemptRecorder />
          <Scorecard />
        </div>
      </div>
    </div>
  );
}
