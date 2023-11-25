import React, { useState } from "react";
import { AudioRecorder } from 'react-audio-voice-recorder';

export default function AudioInput() {
  const [extractedText, setExtractedText] = useState('');
  
  const sendAudioToServer = async (audioBlob) => {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob);
  
      const response = await fetch('http://localhost:8080/api/extractTextFromAudio', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      setExtractedText(data.text);
    } catch (error) {
      console.error('Error sending audio to server:', error);
    }
  };

  return (
    <div>
      <h2>Audio recorder</h2>
      <AudioRecorder 
        onRecordingComplete={sendAudioToServer}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }} 
        downloadFileExtension="wav"
      />

      {extractedText && (
        <div>
          <h2>Extracted Text:</h2>
          <p>{extractedText}</p>
        </div>
      )}
    </div>
  );
}
