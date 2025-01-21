import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import WeatherClock from "../WEATHER/Tempo";
import WeatherCard from "../WEATHER/WeatherCard";
import { useGPS } from '../GPS/useGPS';
import './CardWelcome.css';

const WeatherTimerCard = () => {
    const { location, error } = useGPS();
 
    const cities = ["florianopolis"];
    const apiKey = "066eac4caf7b914446a3c2088682a1bb";

       

    return (
        <Card  className=" col-md-5 p-3 mb-4 card-weather">
            <Card.Body>
            {/* <WeatherClock city={cities[0]} apiKey={apiKey} /> */}

                    <Col className="mb-3 mb-md-0">
                        <div className="weather-container">
                            {location && location.latitude && location.longitude && (
                                <WeatherCard latitude={location.latitude} longitude={location.longitude} />
                            )}
                            {error && <p className="text-danger mt-2">Erro: {error}</p>}
                        </div>
                    </Col>
                   
            </Card.Body>
        </Card>
    );
};

export default WeatherTimerCard;
