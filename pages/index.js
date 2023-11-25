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
}));

export default function Home() {
  const [selectedInput, setSelectedInput] = useState('');

  const handleChange = (event, newInput) => {
    if (newInput !== null) {
      setSelectedInput(newInput);
    }
  };

  return (
    <div>
      <h1>retain</h1>
      <ContentContainer>
        <ToggleButtonGroup
          value={selectedInput}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value="text">Text</ToggleButton>
          <ToggleButton value="image">Image</ToggleButton>
          <ToggleButton value="audio">Audio</ToggleButton>
        </ToggleButtonGroup>

        {selectedInput === 'text' && <InputField />}
        {selectedInput === 'image' && <ImageInput />}
        {selectedInput === 'audio' && <AudioInput />}
      </ContentContainer>
    </div>
  );
}
