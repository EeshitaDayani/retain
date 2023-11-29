import React, { useState } from "react";
import { AudioRecorder } from 'react-audio-voice-recorder';

export default function UserAttemptRecorder() {
  const [extractedText, setExtractedText] = useState('');
  
  const sendAudioToServer = async (audioBlob) => {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob);
  
      const response = await fetch('http://localhost:8080/api/getUserAttempt', {
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#18756e', margin: '20px' }}>
      <AudioRecorder 
        onRecordingComplete={sendAudioToServer}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }} 
        downloadFileExtension="wav"
      />

      {extractedText && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2>user attempt:</h2>
          <p>{extractedText}</p>
        </div>
      )}
    </div>
  );
}
