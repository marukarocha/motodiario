import React from "react";
import { useNavigate } from 'react-router-dom';
import logo from '../../logo.png';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../USER/Auth/AuthContext';
import { auth as authInstance } from '../DB/firebaseServices';
import { signOut } from 'firebase/auth';
import "./Header.css";

const Header = () => {
  const authContext = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(authInstance);
      authContext.setCurrentUser(null);
      localStorage.removeItem('user');
      navigate('/');
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <Navbar className="bg-body-tertiary" expand="md"> {/* Adicionado expand="md" */}
      <Navbar.Brand href="/">
        <img
          alt="Logo do Moto Diário"
          src={logo}
          width="120"
          className="logo d-inline-block align-top"
        />{' '}
        <span className="app-name">Moto Diário</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" /> {/* Adicionado Navbar.Toggle */}
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end"> {/* Adicionado Navbar.Collapse */}
        {authContext.currentUser && (
          <Button variant="danger" onClick={handleLogout} className="logout-button">
            Logout
          </Button>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
