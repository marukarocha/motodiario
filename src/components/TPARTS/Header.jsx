import React, { useEffect, useState } from "react";
import logo from '../../logo.png';
import Navbar from 'react-bootstrap/Navbar';
import "./Header.css"; // Para estilos personalizados, caso necessário


const Header = ({ userName }) => {
    const [currentDate, setCurrentDate] = useState("");
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            setCurrentDate(now.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" }));
            setCurrentTime(now.toLocaleTimeString("pt-BR"));
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 1000); // Atualiza a cada segundo

        return () => clearInterval(interval); // Limpa o intervalo ao desmontar
    }, []);

    return (
        <Navbar className="bg-body-tertiary">
            <Navbar.Brand href="#home">
                <img
                    alt="Logo do Moto Diário"
                    src={logo}
                    width="120"
                    className="logo d-inline-block align-top"
                />{' '}
                <spam className="app-name">Moto Diário</spam>
            </Navbar.Brand>
            <div className="header-info">
                <p>
                   <strong>{currentDate}</strong> <strong>{currentTime}</strong>
                </p>
                <p>
                    Bem-vindo, <strong>{userName || "Usuário"}</strong>!
                </p>
            </div>
        </Navbar>
    );
};

export default Header;
