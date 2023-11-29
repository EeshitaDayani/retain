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

  const handleChange = (event, newInput) => {
    if (newInput !== null) {
      setSelectedInput(newInput);
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
