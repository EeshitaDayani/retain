import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';

export default function InputField() {
  const [input, setInput] = useState('');
  const [extractedText, setExtractedText] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Call the onEnter callback with the current input value
      setInput(e.target.value);
    }
  };

  const extractText = async (input) => {
    // TODO: Fix newline problem for multine textbox
    try {
      const response = await fetch(`http://localhost:8080/api/textInput?value=${input}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const extractedTextResponse = await fetch('http://localhost:8080/api/extractedText', {
        method: 'GET',
      });

      const data = await extractedTextResponse.json();
      return(data.message)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const updateExtractedText = async () => {
      try {
        const text = await extractText(input);
        setExtractedText(text);
      } catch (error) {
        console.error('Error updating extracted text:', error);
      }
    };
  
    updateExtractedText();
  }, [input]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#18756e' }}>
      <h2 >text input</h2>
      <TextField
        id="standard-multiline-static"
        multiline
        rows={4}
        defaultValue="Default Value"
        onKeyPress={handleKeyPress}
      />
    </div>
  );
}
