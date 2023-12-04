import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import InputField from '../src/components/InputField';
import ImageInput from '../src/components/ImageInput';
import AudioInput from '../src/components/AudioInput';
import UserAttemptRecorder from '../src/components/UserAttemptRecorder';
import Scorecard from '../src/components/Scorecard';
import TextField from '@mui/material/TextField';

// TODO: Change font

const ContentContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export default function Home() {
  const [selectedInput, setSelectedInput] = useState('');
  const [transcript, setTranscript] = useState('');
  const [showEditableField, setShowEditableField] = useState(false);

  const handleChange = (event, newInput) => {
    if (newInput !== null) {
      setSelectedInput(newInput);
      setShowEditableField(false); // Hide the editable field when switching input type
    }
  };

  const handleTranscriptSubmit = async () => {
    // Here, you can send the transcript to your server if needed.
    const extractedTextResponse = await fetch('http://localhost:8080/api/extractedText', {
        method: 'GET',
      });

    const data = await extractedTextResponse.json();
    setTranscript(data.message)
    setShowEditableField(true);
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      try {
        fetch(`http://localhost:8080/api/textInput?value=${transcript}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
       })
      }
      catch(error) {
          console.error('Error sending data to the server:', error);
      };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#fffbf6', minHeight: '100vh', color: '#fffbf6' }}>
      <h1 style={{ color: '#18756e', fontSize: '50px', fontWeight: 'bolder' }}>retain</h1>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', marginTop: '40px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #18756e', padding: '25px', borderRadius: '5px' }}>
          <h2 style={{ color: '#18756e' }}>upload reference file</h2>
          <ContentContainer>
            <ToggleButtonGroup
              value={selectedInput}
              exclusive
              onChange={handleChange}
            >
              <ToggleButton value="text">text</ToggleButton>
              <ToggleButton value="image">image</ToggleButton>
              <ToggleButton value="audio">audio</ToggleButton>
            </ToggleButtonGroup>

            {selectedInput === 'text' && <InputField />}
            {selectedInput === 'image' && <ImageInput />}
            {selectedInput === 'audio' && <AudioInput />}
            
            {/* Show the submit button */}
            <button style={{ padding: '10px', margin: '12px', color: '#18756e', backgroundColor: '#fffbf6', borderRadius: '5px', border: '1px solid #18756e', cursor: 'pointer', marginTop: '30px' }} onClick={handleTranscriptSubmit}>Submit</button>
            {/* Show the editable field if submitted */}
            {showEditableField && (
              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2 style={{ color: '#18756e' }}>edit transcription:</h2>
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
          </ContentContainer>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#18756e', border: '1px solid #18756e', padding: '25px', borderRadius: '5px' }}>
          <h2 style={{ color: '#18756e' }}>press to start recording</h2>
          <UserAttemptRecorder />
          <Scorecard />
        </div>
      </div>
    </div>
  );
}
