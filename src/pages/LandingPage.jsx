import React, { useState } from 'react';
import { Button, Collapse } from 'react-bootstrap'; // Importe Button e Collapse
import Register from '../components/USER/REGISTER/Register'; // Importe o componente Register
import Login from '../components/USER/REGISTER/Login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';

function LandingPage() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h1 className="text-center mb-4">Bem-vindo ao Moto Diário</h1>
          <p className="text-center mb-4">
            Seu aplicativo para gerenciar suas corridas e finanças como motorista de aplicativo.
          </p>

          <div className="d-grid gap-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setShowLogin(!showLogin)}
              aria-controls="login-form"
              aria-expanded={showLogin}
            >
              <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
              Fazer Login
            </Button>

            <Collapse in={showLogin}>
              <div id="login-form">
                <Login />
              </div>
            </Collapse>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => setShowRegister(!showRegister)}
              aria-controls="register-form"
              aria-expanded={showRegister}
            >
              <FontAwesomeIcon icon={faUserPlus} className="me-2" />
              Registrar
            </Button>

            <Collapse in={showRegister}>
              <div id="register-form">
                <Register />
              </div>
            </Collapse>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
