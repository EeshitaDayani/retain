import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';

export default function InputField({ onEnter }) {
  const [input, setInput] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Call the onEnter callback with the current input value
      setInput(e.target.value);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:8080/api/textInput?value=${input}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, [input]);

  return (
    <div>
      <h2>Text Input</h2>
      <TextField
        id="outlined-basic"
        rows={4}
        defaultValue="Default Value"
        onKeyPress={handleKeyPress}
      />
      {input && (
        <div>
          <h2>Extracted Text:</h2>
          <p>{input}</p>
        </div>
      )}
    </div>
  );
}
