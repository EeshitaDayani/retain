import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from '@mui/material/TextField';
import InputField from "./inputField";
import ImageInput from "./ImageInput";
import AudioInput from "./AudioInput";

import React, { useState } from 'react';

export function uploadFile(handleChange, handleTranscriptSubmit, handleEnterKeyPress) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "1px solid #18756e",
        padding: "25px",
        borderRadius: "5px",
      }}
    >
      <h2 style={{ color: "#18756e" }}>upload reference file</h2>
      <ToggleButtonGroup
        value={selectedInput}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="text">text</ToggleButton>
        <ToggleButton value="image">image</ToggleButton>
        <ToggleButton value="audio">audio</ToggleButton>
      </ToggleButtonGroup>

      {selectedInput === "text" && <InputField />}
      {selectedInput === "image" && <ImageInput />}
      {selectedInput === "audio" && <AudioInput />}

      <button
        style={{
          padding: "10px",
          margin: "12px",
          color: "#18756e",
          backgroundColor: "#fffbf6",
          borderRadius: "5px",
          border: "1px solid #18756e",
          cursor: "pointer",
          marginTop: "30px",
        }}
        onClick={handleTranscriptSubmit}
      >
        Submit
      </button>
      {showEditableField && (
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2 style={{ color: "#18756e" }}>edit transcription:</h2>
          <TextField
            id="standard-multiline-static"
            multiline
            rows={4}
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            onKeyPress={handleEnterKeyPress}
          />
        </div>
      )}
    </div>
  );
}
