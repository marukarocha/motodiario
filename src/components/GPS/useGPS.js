import { useState, useEffect } from 'react';

export const useGPS = () => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocalização não é suportada pelo navegador.");
            return;
        }

        const handleSuccess = (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
        };

        const handleError = (err) => {
            setError("Erro ao obter a localização.");
            console.error(err);
        };

        const geoOptions = {
            enableHighAccuracy: true,
            timeout: 10000, // 10 segundos
            maximumAge: 0,
        };

        const watcher = navigator.geolocation.watchPosition(handleSuccess, handleError, geoOptions);

        return () => {
            navigator.geolocation.clearWatch(watcher);
        };
    }, []);

    return { location, error };
};
