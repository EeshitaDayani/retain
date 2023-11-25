import { useEffect, useState } from 'react';
import InputField from '../src/components/InputField';
import ImageInput from '../src/components/ImageInput';
import AudioInput from '../src/components/AudioInput';

export default function Home() {
  const [message, setMessage] = useState("Loading");

  const [input, setInput] = useState('empty');

  const handleEnter = (inputValue) => {
    setInput(inputValue);
  };

  useEffect(() => {
    fetch(`http://localhost:8080/api/textInput?value=${input}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        setMessage(data.message);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [input]);

  return (
      <div>
        <h1>retain</h1>
        <InputField onEnter={handleEnter} fontColor='black' />
        <h2>{message}</h2>
        <ImageInput />
        <AudioInput />
      </div>
  )
}
