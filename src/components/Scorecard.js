import React, { useState } from 'react';

export default function Scorecard() {
  const [score, setScore] = useState(null);

  const handleSubmit = () => {
    fetch(`http://localhost:8080/api/compareTexts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setScore(data.score);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#18756e' }}>
      <button style={{ padding: '10px', margin: '12px', color: '#18756e', backgroundColor: '#fffbf6', borderRadius: '5px', border: '2px solid #18756e' }} onClick={handleSubmit}>Submit</button>
      {score !== null && <h2>Your score: {score}</h2>}
    </div>
  );
}
