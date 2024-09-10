import { LoadingProvider, useLoading } from './components/loader/LoadingContext';
import Loader from './components/loader/loader';
import { useState, useEffect, createContext, useContext } from 'react'
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
import { fetchTeams, Team } from './services/teamService';
import { get } from './services/requester.service';
import MatchPair from './components/match-pair/match-pair';

function App() {

  const [count, setCount] = useState(0);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [matches, setMatches] = useState([]);

  const { data } = useCsvData();
  //console.log('All data: ', data);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        let data = await fetchTeams();
        console.log('TEAMS!!! ', data);

        setTeams(data);  // Съхраняваме получените отбори в state
      } catch (err) {
        setError('Failed to fetch teams');
      } finally {
        setLoading(false);
      }
    };

    loadTeams();  // Извикваме функцията за зареждане на отборите
  }, []);

  const fetchMatches = async () => {
    try {
      let data = await get('api/matches'); // Подаваме маршрута за мачовете
      console.log('MATCHES!!! ', data);
      setMatches(data);
    } catch (error) {
      console.error('Error fetching matches:', error);
    }
  };

  const getPlayers = async () => {
    try {
      let data = await get('api/players');
      console.log('PLAYERS!!! ', data);
      setMatches(data);
    } catch (error) {
      console.error('Error fetching matches:', error);
    }
  };

  const getRecords = async () => {
    try {
      let data = await get('api/records');
      console.log('RECORDS!!! ', data);
      setMatches(data);
    } catch (error) {
      console.error('Error fetching matches:', error);
    }
  };

  useEffect(() => {
    fetchMatches();
    getPlayers();
    //getRecords();
  }, []);

  return (
    <>
      <LoadingProvider>
        <AppContent />
      </LoadingProvider>
    </>
  )
}

import { MoonLoader } from 'react-spinners';

const AppContent: React.FC = () => {
  //const [isLoading, setLoading] = useState(true);
  const { isLoading } = useLoading();



  return (
    <>
      {isLoading && <MoonLoader />}
      <Navigation />
      <Routes>
        <Route path="/" element={<Matches />} />
        <Route path="/records" element={<Records />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/group-matches/:groupName" element={<GroupMatches />} />
        <Route path="/match-pair/:teamAId/:teamBId" element={<MatchPair />} />
      </Routes>
    </>
  );
};

export default App
