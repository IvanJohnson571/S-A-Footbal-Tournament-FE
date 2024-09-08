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
import Groups from './components/groups/groups';
import GroupMatches from './components/group-matches/group-matches';



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
        <Route path="/groups" element={<Groups />} />
        <Route path="/group-matches/:groupName" element={<GroupMatches />} />
      </Routes>


    </>
  )
}

export default App
