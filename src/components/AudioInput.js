import React from "react";
import { AudioRecorder } from 'react-audio-voice-recorder';

const addAudioElement = (blob) => {
  const url = URL.createObjectURL(blob);
  console.log(url);
  const audio = document.createElement("audio");
  audio.src = url;
  audio.controls = true;
  document.body.appendChild(audio);

  // Send the audio file to the server for text extraction
  sendAudioToServer(blob);
};

const sendAudioToServer = async (audioBlob) => {
  try {
    const formData = new FormData();
    formData.append('audio', audioBlob);

    const response = await fetch('http://localhost:8080/api/extractTextFromAudio', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log('Text from audio:', data.text);
  } catch (error) {
    console.error('Error sending audio to server:', error);
  }
};

export default function AudioInput() {
  return (
    <div>
      <h1>Audio recorder</h1>
      <AudioRecorder 
        onRecordingComplete={addAudioElement}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }} 
        downloadFileExtension="wav"
      />
    </div>
  );
}
