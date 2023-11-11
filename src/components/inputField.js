import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

export default function InputField({ onEnter }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Call the onEnter callback with the current input value
      if (onEnter) {
        onEnter(e.target.value);
      }
    }
  };

  return (
    <TextField
      id="outlined-multiline-static"
      color="warning"
      label="Multiline"
      multiline
      rows={4}
      defaultValue="Default Value"
    />
  );
}