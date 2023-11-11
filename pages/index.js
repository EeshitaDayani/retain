import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react';
import InputField from '../src/components/InputField';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [message, setMessage] = useState("Loading");

  const [input, setInput] = useState('');

  const handleEnter = (inputValue) => {
    setInput(inputValue);
  };

  console.log(input);

  useEffect(() => {
    fetch("http://localhost:8080/api/home")
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      });
  }, []);

  return (
      <div>
        <h1>retain</h1>
        <InputField onEnter={handleEnter} fontColor='black' />
      </div>
  )
}
