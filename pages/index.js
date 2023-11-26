import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import InputField from '../src/components/InputField';
import ImageInput from '../src/components/ImageInput';
import AudioInput from '../src/components/AudioInput';

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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#fffbf6' }}>
      <h1 style={{ color: '#18756e', fontWeight: 'bolder' }}>retain</h1>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
      <div>
        {/* TODO: Add Recorder for Revise Section */}
      </div>
    </div>
  );
}
