import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { useCsvData } from './services/CsvDataContext';
import Navigation from './components/navigation/navigation';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Matches from './components/matches/matches';
import Records from './components/records/records';



function App() {

  const [count, setCount] = useState(0);

  const { data } = useCsvData();
  console.log('All data: ', data);

  return (
    <>

      <Navigation />
      <Routes>
        <Route path="/" element={<Matches />} />
        <Route path="/records" element={<Records />} />
      </Routes>


    </>
  )
}

export default App
