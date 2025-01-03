import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Dropdown, DropdownButton, Card, Row, Col, Form } from 'react-bootstrap';
import { FaList, FaChartBar, FaPlay, FaMapMarkerAlt, FaMotorcycle, FaCalendarPlus, FaCog, FaTools, FaHandsHelping, FaClock, FaDollarSign } from 'react-icons/fa';
import { FaOilCan, FaCogs, FaGasPump } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './Home.css';

import WeatherClock from "../WEATHER/Tempo";
import Motivation from "./Motivation";

import GPSDistanceTracker from "../GPS/GPSDistanceTracker";
import WeatherCard from "../WEATHER/WeatherCard";
import { useGPS } from '../GPS/useGPS'; // Named export

const Home = () => {
    const [totalKm, setTotalKm] = useState(0);
    const [totalEarnings, setTotalEarnings] = useState(0);
    const [averageConsumption, setAverageConsumption] = useState(0);
    const [totalHoursWorked, setTotalHoursWorked] = useState(0);
    const [selectedPeriod, setSelectedPeriod] = useState("Semana");
    const [selectedDate, setSelectedDate] = useState("");

    const { location, error } = useGPS();
   
    // Simulação de dados
    useEffect(() => {
        const records = [
            { km: 100, fuel: 5, earnings: 200, hours: 5 },
            { km: 200, fuel: 10, earnings: 300, hours: 8 },
        ];
        const totalKm = records.reduce((sum, record) => sum + record.km, 0);
        const totalEarnings = records.reduce((sum, record) => sum + record.earnings, 0);
        const totalFuel = records.reduce((sum, record) => sum + record.fuel, 0); 
        const totalHoursWorked = records.reduce((sum, record) => sum + record.hours, 0);
        setTotalKm(totalKm);
        setTotalEarnings(totalEarnings);
        setAverageConsumption(totalKm / totalFuel || 0);
        setTotalHoursWorked(totalHoursWorked);
    }, []);

    const handlePeriodChange = (period) => setSelectedPeriod(period);

    const handleFuelRegister = () => Swal.fire({
        title: 'Abastecimento',
        text: 'Você adicionou combustível com sucesso!',
        icon: 'info',
        confirmButtonText: 'Entendido',
    });

    const cities = ["florianopolis"]; // Adicione as cidades desejadas
    const apiKey = "066eac4caf7b914446a3c2088682a1bb";
    
    return (
       
        <div className="home-container">


            
           

            <div className="row">
            <div className="widgets-container col-4">
                {cities.map((city, index) => (
                <WeatherClock key={index} city={city} apiKey={apiKey} />
                ))}
            </div>


            <div className="weather-widget col-8">
                <h2>Olá, <strong>Maruk</strong>, bem-vindo ao diário de moto!</h2>
                {location && location.latitude && location.longitude && (
                        <WeatherCard latitude={location.latitude} longitude={location.longitude} />
                    )}
                {error && <p className="text-danger">Erro: {error}</p>}
            </div>
          
            </div>

            <div className="mt-4 mb-4 d-flex justify-content-start gap-3">
            {/* Botão Iniciar Dia */}
            <Button variant="success" className="btn-icon">
                <FaPlay className="me-2" /> Iniciar Dia
            </Button>

            {/* Botão Registrar Abastecimento */}
            <Button 
                variant="warning" 
                className="btn-icon"
                onClick={handleFuelRegister}
            >
                <FaGasPump className="me-2" /> Registrar Abastecimento
            </Button>

            {/* Botão GPS */}
            <Button variant="info" className="btn-icon">
                <FaMapMarkerAlt className="me-2" /> GPS
            </Button>

            {/* Componente de Distância */}
            <GPSDistanceTracker />
        </div>
            
            <div className="mb-4 d-flex align-items-center justify-content-between">
                <DropdownButton title={`Período: ${selectedPeriod}`} onSelect={handlePeriodChange}>
                    <Dropdown.Item eventKey="Semana">Semana</Dropdown.Item>
                    <Dropdown.Item eventKey="Mês">Mês</Dropdown.Item>
                    <Dropdown.Item eventKey="Ano">Ano</Dropdown.Item>
                </DropdownButton>
                <Form.Control
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    placeholder="Selecione uma data"
                    style={{ maxWidth: "200px" }}
                />
            </div>

            <Row className="mb-4">
                    {[
                        { title: "Total Percorrido", value: `${totalKm} km`, icon: <FaList /> },
                        { title: "Consumo Médio", value: `${averageConsumption.toFixed(2)} km/L`, icon: <FaChartBar /> },
                        { title: "Total Arrecadado", value: `R$ ${totalEarnings.toFixed(2)}`, icon: <FaDollarSign /> },
                        { title: "Horas Trabalhadas", value: `${totalHoursWorked} h`, icon: <FaClock /> },
                        { 
                            title: "Ganho por Hora", 
                            value: `R$ ${(totalEarnings / totalHoursWorked).toFixed(2)}`, 
                            icon: <FaDollarSign />, 
                            highlight: true // Propriedade para destaque
                        },
                    ].map((item, idx) => (
                        <Col key={idx} md={4}>
                            <Card 
                                className={`summary-card ${item.highlight ? 'highlight' : ''}`} 
                                style={item.highlight ? { backgroundColor: '#f9c74f', color: '#000' } : {}}
                            >
                                <div className="card-icon-wrapper">
                                    {item.icon && <div className="card-icon">{item.icon}</div>}
                                </div>
                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Text>
                                        <strong>{item.value}</strong>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>


            <Row className="button-grid">
                {[
                    { to: "/listar-ganhos", icon: FaList, text: "Lista" },
                    { to: "/graph-panel", icon: FaChartBar, text: "Gráficos" },
                    { to: "/registrar-ganhos", icon: FaCalendarPlus, text: "Registrar" },
                    { to: "/config", icon: FaCog, text: "Configurações" },
                    { to: "/maintenance", icon: FaTools, text: "Manutenção" },
                    { to: "/Registrar", icon: FaMotorcycle, text: "Config Moto" },
                    { to: "/collaborate", icon: FaHandsHelping, text: "Colabore" },
                ].map((item, idx) => (
                    <Col sm={6} md={4} lg={3} key={idx} className="menu-button">
                        <Link to={item.to}>
                            <Button variant="light" className="icon-button">
                                <item.icon className="button-icon" />
                                <span className="button-text">{item.text}</span>
                            </Button>
                        </Link>
                    </Col>
                ))}
            </Row>
             {/* Manutenção da Moto */}
      <Row className="mt-4">
          <h3>Sobre a moto</h3>
          {[
              { title: "Troca de Óleo", value: "500 km restantes", icon: <FaOilCan className="card-icon" /> },
              { title: "Troca da Relação", value: "1500 km restantes", icon: <FaCogs className="card-icon" /> },
              { title: "Combustível", value: "5 Litros", icon: <FaGasPump className="card-icon" /> },
          ].map((item, idx) => (
            <Col key={idx} md={4}>
            <Card 
                className={`summary-card ${item.highlight ? 'highlight' : ''}`} 
                style={item.highlight ? { backgroundColor: '#f9c74f', color: '#000' } : {}}
            >
                <div className="card-icon-wrapper">
                    {item.icon && <div className="card-icon">{item.icon}</div>}
                </div>
                <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>
                        <strong>{item.value}</strong>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
          ))}
      </Row>
      <Motivation />

        </div>

     
    );
};

export default Home;


