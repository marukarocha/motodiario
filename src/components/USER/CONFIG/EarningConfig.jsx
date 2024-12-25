import React, { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';

const EarningConfig = ({ saveData }) => {
    const [monthlyGoal, setMonthlyGoal] = useState('');
    const [dailyHours, setDailyHours] = useState('');
    const [fixedCosts, setFixedCosts] = useState([
        { id: 1, description: '', value: '', frequency: 'mensal', monthlyCost: 0, annualCost: 0 },
    ]);

    const handleSave = () => {
        saveData({
            monthlyGoal,
            dailyHours,
            fixedCosts: fixedCosts.filter((cost) => cost.description && cost.value),
        });
    };

    const addFixedCost = () => {
        setFixedCosts([
            ...fixedCosts,
            { id: fixedCosts.length + 1, description: '', value: '', frequency: 'mensal', monthlyCost: 0, annualCost: 0 },
        ]);
    };

    const removeFixedCost = (id) => {
        setFixedCosts(fixedCosts.filter((cost) => cost.id !== id));
    };

    const updateFixedCost = (id, field, value) => {
        setFixedCosts(
            fixedCosts.map((cost) =>
                cost.id === id
                    ? {
                          ...cost,
                          [field]: value,
                          ...calculateCosts({ ...cost, [field]: value }),
                      }
                    : cost
            )
        );
    };

    const calculateCosts = (cost) => {
        if (!cost.value) return { monthlyCost: 0, annualCost: 0 };

        const value = parseFloat(cost.value.replace(/[^0-9.-]+/g, '')) || 0;
        let monthlyCost = 0;

        switch (cost.frequency) {
            case 'quinzenal':
                monthlyCost = value * 2; // Quinzenal: 2 vezes no mês
                break;
            case 'mensal':
                monthlyCost = value; // Mensal: valor direto
                break;
            case 'anual':
                monthlyCost = value / 12; // Anual: divide o valor por 12 meses
                break;
            default:
                monthlyCost = 0;
        }

        const annualCost = monthlyCost * 12; // Custo anual é sempre o mensal multiplicado por 12
        return { monthlyCost, annualCost };
    };

    return (
        <div className="config-section financeiro">
            <div className="d-flex align-items-center">
                <h5>Financeiro</h5>
            </div>
            <div className="d-flex row">
            <div className="form-group col-6">
                <label>Meta Mensal (R$):</label>
                <CurrencyInput
                    className="form-control"
                    value={monthlyGoal}
                    onValueChange={(value) => setMonthlyGoal(value)}
                    placeholder="Digite sua meta mensal"
                    prefix="R$ "
                    decimalsLimit={2}
                />
            </div>
            <div className="form-group col-6">
                <label>Horas Desejadas por Dia:</label>
                <input
                    type="number"
                    className="form-control"
                    value={dailyHours}
                    onChange={(e) => setDailyHours(e.target.value)}
                    placeholder="Digite as horas de trabalho por dia"
                />
            </div>
            </div>
            <div className="form-group">
                <label>Custos Fixos:</label>
                {fixedCosts.map((cost) => (
                    <div key={cost.id} className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                            <input
                                type="text"
                                className="form-control me-2"
                                placeholder="Descrição (ex: IPVA)"
                                value={cost.description}
                                onChange={(e) =>
                                    updateFixedCost(cost.id, 'description', e.target.value)
                                }
                            />
                            <CurrencyInput
                                className="form-control me-2"
                                placeholder="Valor (R$)"
                                prefix="R$ "
                                decimalsLimit={2}
                                value={cost.value}
                                onValueChange={(value) =>
                                    updateFixedCost(cost.id, 'value', value)
                                }
                            />
                            <select
                                className="form-control me-2"
                                value={cost.frequency}
                                onChange={(e) =>
                                    updateFixedCost(cost.id, 'frequency', e.target.value)
                                }
                            >
                                <option value="mensal">Mensal</option>
                                <option value="quinzenal">Quinzenal</option>
                                <option value="anual">Anual</option>
                            </select>
                            <button
                                className="btn btn-danger"
                                onClick={() => removeFixedCost(cost.id)}
                            >
                                Remover
                            </button>
                        </div>
                        <div>
                            <small>Gasto Mensal: R$ {cost.monthlyCost.toFixed(2)}</small> |{' '}
                            <small>Total Anual: R$ {cost.annualCost.toFixed(2)}</small>
                        </div>
                    </div>
                ))}
                <button className="btn btn-secondary mt-2" onClick={addFixedCost}>
                    Adicionar Custo Fixo
                </button>
            </div>
            <button className="btn btn-primary mt-3" onClick={handleSave}>
                Salvar
            </button>
        </div>
    );
};

export default EarningConfig;
