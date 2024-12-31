import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import logo from '../../logo.png';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../USER/Auth/AuthContext';
import { auth as authInstance } from '../DB/firebaseServices'; // Renomeie o auth importado para authInstance
import { signOut } from 'firebase/auth';
import "./Header.css";

const Header = ({ userName }) => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const authContext = useAuth(); // Mantenha authContext para o contexto
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

  const handleLogout = async () => {
    try {
      await signOut(authInstance); // Use authInstance para o signOut do Firebase
      authContext.setCurrentUser(null);
      localStorage.removeItem('user');
      navigate('/');
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <Navbar className="bg-body-tertiary">
      <Navbar.Brand href="/">
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
          Bem-vindo, <strong>{authContext.currentUser?.email || "Usuário"}</strong>! {/* Use authContext.currentUser */}
        </p>
      </div>
      {authContext.currentUser && ( // Use authContext.currentUser
        <Button variant="danger" onClick={handleLogout} className="logout-button">
          Logout
        </Button>
      )}
    </Navbar>
  );
};

export default Header;
