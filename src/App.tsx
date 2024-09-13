import { LoadingProvider, useLoading } from './components/loader/LoadingContext';
import Loader from './components/loader/loader';
import { useState, useEffect, createContext, useContext } from 'react'
import uefaLogo from './assets/UEFA-Euro-2024-Logo.png'
import './App.css'
import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from './components/navigation/navigation';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Matches from './components/matches/matches';
import Groups from './components/groups/groups';
import GroupMatches from './components/group-matches/group-matches';
import { get } from './services/requester.service';
import MatchPair from './components/match-pair/match-pair';
import Footer from './components/Footer/footer';
import PageNotFound from './components/page-not-found/pageNotFound';


function App() {

  const [count, setCount] = useState(0);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        let data = await get('api/teams');
        setTeams(data);
      } catch (err) {
        setError('Failed to fetch teams');
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  const fetchMatches = async () => {
    try {
      let data = await get('api/matches');
      setMatches(data);
    } catch (error) {
      console.error('Error fetching matches:', error);
    }
  };

  const getPlayers = async () => {
    try {
      let data = await get('api/players');
      setMatches(data);
    } catch (error) {
      console.error('Error fetching matches:', error);
    }
  };

  const getRecords = async () => {
    try {
      let data = await get('api/records');
      setMatches(data);
    } catch (error) {
      console.error('Error fetching matches:', error);
    }
  };

  useEffect(() => {
    //Load Data from the DB
    fetchMatches();
    getPlayers();
    getRecords();
  }, []);

  return (
    <>
      <LoadingProvider>
        <div className="app-container">
          <AppContent />
          <Footer />
        </div>
      </LoadingProvider>
    </>
  )
}

const AppContent: React.FC = () => {

  const { isLoading } = useLoading();

  return (
    <>
      {isLoading && <Loader />}
      <Navigation />
      <Routes>
        <Route path="/" element={<Matches />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/group-matches/:groupName" element={<GroupMatches />} />
        <Route path="/match-pair/:teamAId/:teamBId" element={<MatchPair />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App