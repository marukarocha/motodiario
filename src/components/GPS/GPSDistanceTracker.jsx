import React, { useState } from "react";
import calculateDistance from "./calculateDistance";
import { AiOutlineEnvironment } from "react-icons/ai"; // Ícone de GPS
import Swal from "sweetalert2";

const GPSDistanceTracker = () => {
  const [distance, setDistance] = useState(0);
  const [lastLocation, setLastLocation] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [watcherId, setWatcherId] = useState(null);

  const requestGeolocationPermission = () => {
    Swal.fire({
      title: "Ativar localização?",
      text: "Permitir que a aplicação acesse sua localização para rastreamento.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#28a745", // Verde
      cancelButtonColor: "#dc3545", // Vermelho
      confirmButtonText: "Sim, ativar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Consentimento dado, iniciando rastreamento.");
        enableGeolocation(); // Agora pedimos ao navegador
      } else {
        console.log("Consentimento negado.");
      }
    });
  };

  const enableGeolocation = () => {
    if (!navigator.geolocation) {
      Swal.fire("Erro", "Seu navegador não suporta geolocalização.", "error");
      return;
    }

    const id = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Nova posição recebida:", { latitude, longitude });

        if (lastLocation) {
          const km = calculateDistance(
            lastLocation.latitude,
            lastLocation.longitude,
            latitude,
            longitude
          );
          setDistance((prev) => prev + km);
        }
        setLastLocation({ latitude, longitude });
      },
      (err) => {
        console.error("Erro ao acessar a localização:", err);
        Swal.fire("Erro", "Não foi possível acessar a localização.", "error");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );

    setWatcherId(id);
    setTracking(true);
  };

  const disableGeolocation = () => {
    console.log("Desativando rastreamento...");
    if (watcherId !== null) {
      navigator.geolocation.clearWatch(watcherId);
      setWatcherId(null);
    }
    setTracking(false);
    setLastLocation(null);
  };

  const toggleTracking = () => {
    if (tracking) {
      disableGeolocation();
    } else {
      requestGeolocationPermission();
    }
  };

  return (
    <div>
      <button
        onClick={toggleTracking}
        style={{
          backgroundColor: tracking ? "#28a745" : "#dc3545", // Verde para ligado, vermelho para desligado
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
        }}
      >
        <AiOutlineEnvironment size={20} style={{ marginRight: "10px" }} />
        {tracking ? "Desligar Localização" : "Ligar Localização"}
      </button>
      <div style={{ marginTop: "20px" }}>
        <p>Total Percorrido: {distance.toFixed(2)} km</p>
      </div>
    </div>
  );
};

export default GPSDistanceTracker;
