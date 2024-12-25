import React from 'react';
import UserConfig from './UserConfig';
import EarningConfig from './EarningConfig';
import MotoConfig from './MotoConfig';
import "./ConfigPage.css"; // Para estilos personalizados, caso necessário


const ConfigPage = () => {
    const saveData = (data) => {
        // Salvar no Firebase
        console.log('Dados salvos:', data);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Configurações</h2>
            <UserConfig saveData={saveData} />
            <EarningConfig saveData={saveData} />
            <MotoConfig saveData={saveData} />
        </div>
    );
};

export default ConfigPage;
