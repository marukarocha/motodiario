import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './components/USER/Auth/AuthContext';
import Home from './components/HOME/Home';
import DayRegister from './components/DIARIA/DayRegister';
import ConfigPanel from './components/ConfigPanel';
import GraphPanel from './components/GraphPanel';
import RecordList from './components/RecordList';
import Maintenance from './components/Maintenance';
import Collaborate from './components/Collaborate';
import ConfigPage from './components/USER/CONFIG/ConfigPage';
import Header from './components/TPARTS/Header';
import Login from './components/USER/REGISTER/Login';
import Register from './components/USER/REGISTER/Register';

function App() {
  const { currentUser } = useAuth();

  return (
    <div className="App">
      <Router>
        <Header userName={currentUser?.email || "Visitante"} />
        <header className="App-header">
          <Routes>
            <Route path="/" element={!currentUser ? (
              <>
                <Login />
                <Register />
              </>
            ) : (
              <Navigate to="/home" />
            )} />
            <Route path="/home" element={currentUser ? <Home /> : <Navigate to="/" />} />
            <Route path="/day-register" element={<DayRegister />} />
            <Route path="/config-panel" element={<ConfigPanel />} />
            <Route path="/graph-panel" element={<GraphPanel />} />
            <Route path="/list" element={<RecordList />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/collaborate" element={<Collaborate />} />
            <Route path="/config" element={<ConfigPage />} />
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
