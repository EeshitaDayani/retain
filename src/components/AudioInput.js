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

      const extractedTextResponse = await fetch('http://localhost:8080/api/extractedText', {
        method: 'GET',
      });
  
      const data = await extractedTextResponse.json();
      setExtractedText(data.message);
    } catch (error) {
      console.error('Error sending audio to server:', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#18756e' }}>
      <h2>audio recorder</h2>
      <AudioRecorder 
        onRecordingComplete={sendAudioToServer}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }} 
        downloadFileExtension="wav"
      />
    </div>
  );
}
