import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import logo from '../../logo.png';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'; // Importe o Button do react-bootstrap
import { useAuth } from '../USER/Auth/AuthContext'; // Importe o useAuth
import "./Header.css";

const Header = ({ userName }) => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const auth = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDate(now.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" }));
      setCurrentTime(now.toLocaleTimeString("pt-BR"));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    auth.setCurrentUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };


  return (
    <Navbar className="bg-body-tertiary">
      <Navbar.Brand href="/"> {/* Use "/" para a página inicial */}
        <img
          alt="Logo do Moto Diário"
          src={logo}
          width="120"
          className="logo d-inline-block align-top"
        />{' '}
        <span className="app-name">Moto Diário</span>
      </Navbar.Brand>
      <div className="header-info">
        <p>
          <strong>{currentDate}</strong> <strong>{currentTime}</strong>
        </p>
        <p>
          Bem-vindo, <strong>{userName || "Usuário"}</strong>!
        </p>
      </div>
      {auth.currentUser && ( // Linha 54 corrigida: use auth.currentUser
        <Button variant="danger" onClick={handleLogout} className="logout-button">
          Logout
        </Button>
      )}
    </Navbar>
  );
};

export default Header;
