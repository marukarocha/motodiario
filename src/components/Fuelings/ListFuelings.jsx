import React, { useState, useEffect } from 'react';
import { getFuelings } from '../DB/firebaseServices';
import { useAuth } from '../USER/Auth/AuthContext';
import { Table, Alert, Button, Card, Row, Col, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGasPump, faTrash, faEdit, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { doc, deleteDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { db } from '../DB/firebaseServices';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function ListFuelings() {
    const { currentUser } = useAuth();
    const userId = currentUser ? currentUser.uid : null;
    const [fuelings, setFuelings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [weeklyData, setWeeklyData] = useState({
        totalLiters: 0,
        averageConsumption: 0,
        totalSpent: 0,
        dailyLiters: [],
    });
    const [filterDate, setFilterDate] = useState(new Date());

    useEffect(() => {
        const fetchFuelings = async () => {
            if (!userId) {
                setError("Usuário não autenticado.");
                setLoading(false);
                return;
            }
            try {
                const data = await getFuelings(userId, filterDate);
                setFuelings(data);
                calculateWeeklyData(data, filterDate);
            } catch (error) {
                setError('Erro ao carregar os abastecimentos.');
                console.error("Erro ao obter abastecimentos:", error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchFuelings();
        }
    }, [userId, filterDate]);

    const handleDelete = async (fuelingId) => {
        try {
            const confirmResult = await Swal.fire({
                title: 'Tem certeza?',
                text: "Você não poderá reverter isso!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, exclua!'
            });

            if (confirmResult.isConfirmed) {
                await deleteDoc(doc(db, 'users', userId, 'abastecimentos', fuelingId));
                setFuelings(fuelings.filter(fueling => fueling.id !== fuelingId));
                Swal.fire(
                    'Excluído!',
                    'O abastecimento foi excluído.',
                    'success'
                );
            }
        } catch (error) {
            console.error("Erro ao excluir abastecimento:", error);
            Swal.fire(
                'Erro!',
                'Ocorreu um erro ao excluir o abastecimento.',
                'error'
            );
        }
    };

    const calculateWeeklyData = (fuelingsData, filterDate) => {
        const today = filterDate;
        const weekAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);
        const last7Days = fuelingsData.filter(fueling => {
            const [day, month, year] = fueling.data.split('/');
            const fuelingDate = new Date(year, month - 1, day);
            return fuelingDate >= weekAgo && fuelingDate <= today;
        });

        let totalLiters = 0;
        let totalSpent = 0;
        const dailyLiters = [0, 0, 0, 0, 0, 0, 0];

        last7Days.forEach(fueling => {
            totalLiters += parseFloat(fueling.litros);
            totalSpent += parseFloat(fueling.litros) * parseFloat(fueling.valorLitro);

            const [day, month, year] = fueling.data.split('/');
            const fuelingDate = new Date(year, month - 1, day);
            const dayOfWeek = fuelingDate.getDay();
            dailyLiters[dayOfWeek] += parseFloat(fueling.litros);
        });

        const averageConsumption = totalLiters > 0 ? 15 : 0; // Substitua 15 pelo cálculo real

        setWeeklyData({
            totalLiters,
            averageConsumption,
            totalSpent,
            dailyLiters,
        });
    };

    const chartData = {
        labels: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
        datasets: [{
            label: 'Litros Abastecidos',
            data: weeklyData.dailyLiters,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
        }],
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    const handleDateChange = (date) => {
        setFilterDate(date);
    };

    if (loading) {
        return <p>Carregando abastecimentos...</p>;
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <div className="container mt-5">
            <Row className="mb-4">
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <FontAwesomeIcon icon={faChartLine} className="me-2" />
                                Total Litros (Semana)
                            </Card.Title>
                            <Card.Text>{weeklyData.totalLiters.toFixed(2)} L</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <FontAwesomeIcon icon={faChartLine} className="me-2" />
                                Média de Consumo
                            </Card.Title>
                            <Card.Text>{weeklyData.averageConsumption.toFixed(2)} km/L</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <FontAwesomeIcon icon={faChartLine} className="me-2" />
                                Total Gasto (Semana)
                            </Card.Title>
                            <Card.Text>R$ {weeklyData.totalSpent.toFixed(2)}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <h2 className="text-center mb-4">
                <FontAwesomeIcon icon={faGasPump} className="me-2" /> Lista de Abastecimentos
            </h2>

            <div className="mb-4">
                <Form.Group controlId="filterDate">
                    <Form.Label>Filtrar por data:</Form.Label>
                    <Form.Control
                        type="date"
                        value={filterDate.toISOString().split('T')[0]}
                        onChange={(e) => handleDateChange(new Date(e.target.value))}
                    />
                </Form.Group>
            </div>

            <div className="mb-4">
                <Bar data={chartData} options={chartOptions} />
            </div>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Hora</th>
                        <th>Posto</th>
                        <th>Combustível</th>
                        <th>Litros</th>
                        <th>Valor/Litro</th>
                        <th>Valor Total</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {fuelings.map((fueling) => (
                        <tr key={fueling.id}>
                            <td>{fueling.data}</td>
                            <td>{fueling.hora}</td>
                            <td>{fueling.posto}</td>
                            <td>{fueling.combustivel}</td>
                            <td>{fueling.litros}</td>
                            <td>R$ {fueling.valorLitro}</td>
                            <td>R$ {(fueling.litros * fueling.valorLitro).toFixed(2)}</td>
                            <td>
                                <Button variant="warning" size="sm" className="me-2">
                                    <FontAwesomeIcon icon={faEdit} />
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(fueling.id)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {fuelings.length === 0 && <p>Nenhum abastecimento registrado para a data selecionada.</p>}
        </div>
    );
}

export default ListFuelings;
