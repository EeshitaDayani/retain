import { useEffect, useState } from 'react';
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function About() {
  const [message, setMessage] = useState("Loading");
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/home")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        setMessage(data.message);
      });
  }, []);

  

  return (
    <>
    <h1>about</h1>
    <h2>{message}</h2>
    </>
  )
}
