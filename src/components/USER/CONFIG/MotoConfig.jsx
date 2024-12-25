import React, { useState } from 'react';
import InputMask from 'react-input-mask';

const MotoConfig = ({ saveData }) => {
    const [moto, setMoto] = useState({
        model: '',
        color: '',
        year: '',
        initialKm: '',
        relationChangeKm: '',
        oilChangeKm: '',
        lubricationKm: '',
        tankVolume: '',
        lastMaintenance: '',
    });

    const handleSave = () => {
        saveData(moto);
    };

    const colors = ['Vermelho', 'Azul', 'Preto', 'Branco', 'Amarelo'];
    const models = ['Honda CG 160', 'Yamaha Fazer 250', 'Suzuki Yes 125'];
    const years = Array.from({ length: 27 }, (_, i) => 2000 + i);

    return (
        <div className="config-section">
            <div className="d-flex align-items-center">
                <h5>Informações da Moto</h5>
            </div>
            <div className="form-grid">
                <div className="form-group">
                    <label>Modelo:</label>
                    <select
                        className="form-control"
                        value={moto.model}
                        onChange={(e) => setMoto({ ...moto, model: e.target.value })}
                    >
                        <option value="">Selecione o modelo</option>
                        {models.map((model) => (
                            <option key={model} value={model}>
                                {model}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Cor:</label>
                    <select
                        className="form-control"
                        value={moto.color}
                        onChange={(e) => setMoto({ ...moto, color: e.target.value })}
                    >
                        <option value="">Selecione a cor</option>
                        {colors.map((color) => (
                            <option key={color} value={color}>
                                {color}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Ano:</label>
                    <select
                        className="form-control"
                        value={moto.year}
                        onChange={(e) => setMoto({ ...moto, year: e.target.value })}
                    >
                        <option value="">Selecione o ano</option>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Quilometragem Inicial (km):</label>
                    <InputMask
                        mask="999999"
                        className="form-control"
                        value={moto.initialKm}
                        onChange={(e) => setMoto({ ...moto, initialKm: e.target.value })}
                        placeholder="Ex: 12345 km"
                    />
                </div>
                <div className="form-group">
                    <label>Troca da Relação (km):</label>
                    <InputMask
                        mask="999999"
                        className="form-control"
                        value={moto.relationChangeKm}
                        onChange={(e) => setMoto({ ...moto, relationChangeKm: e.target.value })}
                        placeholder="Ex: 5000 km"
                    />
                </div>
                <div className="form-group">
                    <label>Troca de Óleo (km):</label>
                    <InputMask
                        mask="999999"
                        className="form-control"
                        value={moto.oilChangeKm}
                        onChange={(e) => setMoto({ ...moto, oilChangeKm: e.target.value })}
                        placeholder="Ex: 2000 km"
                    />
                </div>
                <div className="form-group">
                    <label>Lubrificação da Relação (km):</label>
                    <InputMask
                        mask="999999"
                        className="form-control"
                        value={moto.lubricationKm}
                        onChange={(e) => setMoto({ ...moto, lubricationKm: e.target.value })}
                        placeholder="Ex: 1000 km"
                    />
                </div>
                <div className="form-group">
                    <label>Capacidade do Tanque (litros):</label>
                    <InputMask
                        mask="99"
                        className="form-control"
                        value={moto.tankVolume}
                        onChange={(e) => setMoto({ ...moto, tankVolume: e.target.value })}
                        placeholder="Ex: 20 litros"
                    />
                </div>
                <div className="form-group">
                    <label>Última Manutenção:</label>
                    <InputMask
                        mask="99/99/9999"
                        className="form-control"
                        value={moto.lastMaintenance}
                        onChange={(e) => setMoto({ ...moto, lastMaintenance: e.target.value })}
                        placeholder="Ex: 01/01/2024"
                    />
                </div>
            </div>
            <button className="btn btn-primary mt-3" onClick={handleSave}>
                Salvar
            </button>
        </div>
    );
};

export default MotoConfig;
