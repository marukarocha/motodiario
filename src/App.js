import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'; // Importe useNavigate
import { useAuth } from './components/USER/Auth/AuthContext';
import Home from './components/HOME/Home';
import DayRegister from './components/DIARIA/DayRegister';
import ConfigPanel from './components/ConfigPanel';
import GraphPanel from './components/GraphPanel';
import RecordList from './components/RecordList';
import Maintenance from './components/Maintenance';
import Collaborate from './components/Collaborate';
import ConfigPage from './components/USER/CONFIG/ConfigPage';
import Header from './components/UI/Header';
import RegistrarGanhos from './components/Earnings/RegisterEarnings'; // Importe o componente
import LandingPage from './pages/LandingPage';
import ListEarnings from './components/Earnings/ListEarnings'; // Importe o componente
import RegisterBike from './components/BIKE/RegisterBike'; // Importe o componente

function App() {
  const { currentUser } = useAuth();

  return (
    <div className="App">
      <Router>
        <Header userName={currentUser?.email || "Visitante"} />
        <header className="App-header">
          <Routes>
            <Route
              path="/"
              element={
                !currentUser ? (
                  <LandingPage />
                ) : (
                  <Navigate to="/home" replace={true} />
                )
              }
            />
            <Route
              path="/home"
              element={
                currentUser ? (
                  <Home />
                ) : (
                  <Navigate to="/" replace={true} />
                )
              }
            />
            <Route path="/day-register" element={<DayRegister />} />
            <Route path="/config-panel" element={<ConfigPanel />} />
            <Route path="/graph-panel" element={<GraphPanel />} />
            <Route path="/list" element={<RecordList />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/collaborate" element={<Collaborate />} />
            <Route path="/config" element={<ConfigPage />} />
            <Route path="/registrar-ganhos" element={<RegistrarGanhos />} />
            <Route path="/listar-ganhos" element={<ListEarnings/>} />
            <Route path="/registrar" element={<RegisterBike/>} />
          </Routes>
        </header>
        <footer>
          <p>
            Aplicação OpenSource <code>src/App.js</code> Maruk
          </p>
        </footer>
      </Router>
    </div>
  );
}

export default App;
