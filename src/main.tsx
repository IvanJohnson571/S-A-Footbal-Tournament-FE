//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import React from 'react';
import ReactDOM from 'react-dom';

createRoot(document.getElementById('root')!).render(
  ///<StrictMode>
  <App />
  //</StrictMode>,
)
