import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './components/USER/Auth/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './components/HOME/Home';
import DayRegister from './components/DIARIA/DayRegister';
import ConfigPanel from './components/ConfigPanel';
import GraphPanel from './components/GraphPanel';
import RecordList from './components/RecordList';
import Maintenance from './components/Maintenance';
import Collaborate from './components/Collaborate';
import ConfigPage from './components/USER/CONFIG/ConfigPage';
import Header from './components/UI/Header';
import RegistrarGanhos from './components/Earnings/RegisterEarnings';
import LandingPage from './pages/LandingPage';
import ListEarnings from './components/Earnings/ListEarnings';
import ListFuelings from './components/Fuelings/ListFuelings';
import RegisterBike from './components/BIKE/RegisterBike';
import ViewBike from './components/BIKE/ViewBike';
import SpeedometerTransition from './components/UI/PageTransition';
import { AuthProvider } from './components/USER/Auth/AuthContext'; // Importe o AuthProvider
function App() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);

  return (
    <AuthProvider>
    <div className="App">
      <Router>
        <Header userName={currentUser?.email || "Visitante"} />
        {/* Passe currentUser para AppRoutes */}
        <AppRoutes loading={loading} setLoading={setLoading} currentUser={currentUser} />
        <SpeedometerTransition isVisible={loading} />
        <footer>
          <p>
            Aplicação OpenSource <code>src/App.js</code> Maruk
          </p>
        </footer>
      </Router>
    </div>
    </AuthProvider>
  );
}


function AppRoutes({ loading, setLoading, currentUser }) { // Receba currentUser como prop
  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
      <Routes key={location.pathname} location={location}>
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
              <AnimatedPage><Home /></AnimatedPage>
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        />
        <Route path="/day-register" element={<AnimatedPage><DayRegister /></AnimatedPage>} />
        <Route path="/config-panel" element={<AnimatedPage><ConfigPanel /></AnimatedPage>} />
        <Route path="/graph-panel" element={<AnimatedPage><GraphPanel /></AnimatedPage>} />
        <Route path="/list" element={<AnimatedPage><RecordList /></AnimatedPage>} />
        <Route path="/maintenance" element={<AnimatedPage><Maintenance /></AnimatedPage>} />
        <Route path="/collaborate" element={<AnimatedPage><Collaborate /></AnimatedPage>} />
        <Route path="/config" element={<AnimatedPage><ConfigPage /></AnimatedPage>} />
        <Route path="/registrar-ganhos" element={<AnimatedPage><RegistrarGanhos /></AnimatedPage>} />
        <Route path="/listar-ganhos" element={<AnimatedPage><ListEarnings /></AnimatedPage>} />
        <Route path="/listar-abastecimento" element={<AnimatedPage><ListFuelings /></AnimatedPage>} />
        <Route path="/registrar" element={<AnimatedPage><RegisterBike /></AnimatedPage>} />
        <Route path="/view-bike" element={<AnimatedPage><ViewBike /></AnimatedPage>} />
      </Routes>
    </AnimatePresence>
  );
}


// Componente para animar as transições de página
const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default App;
