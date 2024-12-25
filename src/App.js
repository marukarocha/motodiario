import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

import Home from './components/HOME/Home';
import DayRegister from './components/DIARIA/DayRegister';
import ConfigPanel from './components/ConfigPanel';
import GraphPanel from './components/GraphPanel';
import RecordList from './components/RecordList';
import Maintenance from './components/Maintenance';
import Collaborate from './components/Collaborate';
import ConfigPage from './components/USER/CONFIG/ConfigPage';

import Login from './components/USER/REGISTER/Login';
import Register from './components/USER/REGISTER/Register';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/*"
                        element={
                            <ProtectedRoute>
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
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
