import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/HOME/Home'; // Nova tela inicial
import DayRegister from './components/DIARIA/DayRegister';
import ConfigPanel from './components/ConfigPanel';
import GraphPanel from './components/GraphPanel';
import RecordList from './components/RecordList';
import Maintenance from './components/Maintenance';
import Collaborate from './components/Collaborate';
import ConfigPage from './components/USER/CONFIG/ConfigPage';
import Header from './components/TPARTS/Header'; // Novo componente de cabeçalho


// configurações de login




function App() {

    const userName = "Maruk"; // Substitua pelo nome do usuário logado, se houver
    return (
        
        <div className="App">
        <Header userName={userName} />
        <header className="App-header">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/day-register" element={<DayRegister />} />
                    <Route path="/config-panel" element={<ConfigPanel />} />
                    <Route path="/graph-panel" element={<GraphPanel />} />
                    <Route path="/list" element={<RecordList />} />
                    <Route path="/maintenance" element={<Maintenance />} />
                    <Route path="/collaborate" element={<Collaborate />} />
                    <Route path="/config" element={<ConfigPage />} />
                </Routes>
            </Router>
         
        </header>
        <footer>
            <p>
                Aplicação OpenSource <code>src/App.js</code> Maruk
            </p>
        </footer>
    </div>
    );
}

export default App;
