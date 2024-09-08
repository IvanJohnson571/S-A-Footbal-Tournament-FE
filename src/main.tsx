//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { CsvDataProvider } from './services/CsvDataContext.tsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  ///<StrictMode>
  <BrowserRouter>
    <CsvDataProvider>
      <App />
    </CsvDataProvider>
  </BrowserRouter>

  //</StrictMode>,
)
