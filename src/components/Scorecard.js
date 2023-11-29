import React, { useState, useEffect } from 'react';

export default function Scorecard() {
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:8080/api/compareTexts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, [score]);

  return (
    <div >
      <h2>your score: {score}</h2>
    </div>
  )
}
