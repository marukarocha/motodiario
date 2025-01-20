import React, { useState, useEffect } from 'react';
import { useAuth } from '../USER/Auth/AuthContext';
import { getEarnings, deleteEarning } from '../DB/firebaseServices';
import { Table, Alert, Card, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faListAlt,
    faChartPie,
    faChartLine,
    faMoneyBillWave,
    faCalendarAlt,
    faTrash,
    faEdit,
    faPlusCircle,
    faSun,
    faRoad,
    faMoon,
    faCloudSun
} from '@fortawesome/free-solid-svg-icons';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip as ChartTooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import Swal from 'sweetalert2';
import RegisterEarnings from './RegisterEarnings';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    ChartTooltip,
    Legend,
    ArcElement
);

registerLocale('pt-BR', ptBR);

function ListEarnings() {
    const { currentUser } = useAuth();
    const [earnings, setEarnings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [summaryData, setSummaryData] = useState({
        totalEarnings: 0,
        averageEarningPerHour: 0,
        totalKm: 0,
        averageKmPerDay: 0,
    });
    const [filterStartDate, setFilterStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 6)));
    const [filterEndDate, setFilterEndDate] = useState(new Date());

    const dailyGoal = 200; // Meta diária simulada

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    useEffect(() => {
        const fetchEarnings = async () => {
            if (!currentUser) {
                setError("Usuário não autenticado.");
                setLoading(false);
                return;
            }
            try {
                const userEarnings = await getEarnings(currentUser.uid, filterStartDate, filterEndDate);
                setEarnings(userEarnings);
                calculateSummaryData(userEarnings);
            } catch (error) {
                setError('Erro ao carregar os ganhos.');
                console.error("Erro ao obter ganhos:", error);
            } finally {
                setLoading(false);
            }
        };

        if (currentUser) {
            fetchEarnings();
        }
    }, [currentUser, filterStartDate, filterEndDate]);

    const calculateSummaryData = (earningsData) => {
        let totalEarnings = 0;
        let totalKm = 0;
        let totalHours = 0;
        let totalDays = 0;

        if (earningsData.length > 0) {
            const firstEarningDate = new Date(Math.min(...earningsData.map(e => e.date.toDate())));
            const lastEarningDate = new Date(Math.max(...earningsData.map(e => e.date.toDate())));
            totalDays = Math.round((lastEarningDate - firstEarningDate) / (1000 * 60 * 60 * 24)) + 1;

            earningsData.forEach(earning => {
                totalEarnings += parseFloat(earning.amount);
                totalKm += parseFloat(earning.mileage);
                totalHours += parseFloat(earning.hours);
            });
        }

        const averageEarningPerHour = totalHours > 0 ? (totalEarnings / totalHours) : 0;
        const averageKmPerDay = totalDays > 0 ? (totalKm / totalDays) : 0;

        setSummaryData({
            totalEarnings,
            averageEarningPerHour,
            totalKm,
            averageKmPerDay,
        });
    };

    const earningsByPlatform = earnings.reduce((acc, earning) => {
        const platform = earning.platform;
        if (!acc[platform]) {
            acc[platform] = 0;
        }
        acc[platform] += parseFloat(earning.amount);
        return acc;
    }, {});

    const kmByPlatform = earnings.reduce((acc, earning) => {
        const platform = earning.platform;
        if (!acc[platform]) {
            acc[platform] = 0;
        }
        acc[platform] += parseFloat(earning.mileage);
        return acc;
    }, {});

    const pieChartData = {
        labels: Object.keys(earningsByPlatform),
        datasets: [{
            label: 'Ganhos por Plataforma',
            data: Object.values(earningsByPlatform),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };

    const barChartData = {
        labels: Object.keys(kmByPlatform),
        datasets: [{
            label: 'KM por Plataforma',
            data: Object.values(kmByPlatform),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }],
    };

    const lineChartData = {
        labels: earnings.map(earning => earning.date.toDate().toLocaleDateString()),
        datasets: [
            {
                label: 'Ganhos Diários',
                data: earnings.map(earning => earning.amount),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            },
            {
                label: 'Meta Diária',
                data: earnings.map(() => dailyGoal),
                fill: false,
                borderColor: 'rgb(255, 0, 0)',
                tension: 0.1,
                borderDash: [5, 5],
            },
        ]
    };

    const handleStartDateChange = (date) => {
        setFilterStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setFilterEndDate(date);
    };

    const setToday = () => {
        const today = new Date();
        setFilterStartDate(today);
        setFilterEndDate(today);
    };

    const setLast7Days = () => {
        setFilterStartDate(new Date(new Date().setDate(new Date().getDate() - 6)));
        setFilterEndDate(new Date());
    };

    const setLast15Days = () => {
        setFilterStartDate(new Date(new Date().setDate(new Date().getDate() - 14)));
        setFilterEndDate(new Date());
    };

    const setThisMonth = () => {
        const today = new Date();
        setFilterStartDate(new Date(today.getFullYear(), today.getMonth(), 1));
        setFilterEndDate(new Date());
    };

    const handleDelete = async (earningId) => {
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
                await deleteEarning(currentUser.uid, earningId);
                setEarnings(earnings.filter(earning => earning.id !== earningId));
                Swal.fire(
                    'Excluído!',
                    'O ganho foi excluído.',
                    'success'
                );
            }
        } catch (error) {
            console.error("Erro ao excluir ganho:", error);
            Swal.fire(
                'Erro!',
                'Ocorreu um erro ao excluir o ganho.',
                'error'
            );
        }
    };

    const getShiftIcon = (hour) => {
        if (hour >= 6 && hour < 12) {
            return faSun; // Manhã
        } else if (hour >= 12 && hour < 18) {
            return faCloudSun; // Tarde
        } else {
            return faMoon; // Noite
        }
    };

    const getShiftName = (hour) => {
        if (hour >= 6 && hour < 12) {
            return 'Manhã';
        } else if (hour >= 12 && hour < 18) {
            return 'Tarde';
        } else {
            return 'Noite';
        }
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <div className="container mt-5">
            <Row className="mb-3">
                <Col className="text-start">
                    <Button variant="success" onClick={handleShowModal}>
                        <FontAwesomeIcon icon={faPlusCircle} className="me-2" />
                        Registrar Ganho
                    </Button>
                </Col>
            </Row>

            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Registrar Ganho</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RegisterEarnings onClose={handleCloseModal} />
                </Modal.Body>
            </Modal>

            <h2 className="text-center mb-4">
                <FontAwesomeIcon icon={faListAlt} className="me-2" />
                Lista de Ganhos
            </h2>

            <Row className="mb-4">
                <Col xs={12} md={4}>
                    <Form.Group controlId="filterStartDate">
                        <Form.Label style={{ fontSize: '0.9rem' }}>
                            <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                            Data Inicial
                        </Form.Label>
                        <DatePicker
                            selected={filterStartDate}
                            onChange={handleStartDateChange}
                            dateFormat="dd/MM/yyyy"
                            locale="pt-BR"
                            className="form-control form-control-sm"
                        />
                    </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                    <Form.Group controlId="filterEndDate">
                        <Form.Label style={{ fontSize: '0.9rem' }}>
                            <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                            Data Final
                        </Form.Label>
                        <DatePicker
                            selected={filterEndDate}
                            onChange={handleEndDateChange}
                            dateFormat="dd/MM/yyyy"
                            locale="pt-BR"
                            className="form-control form-control-sm"
                        />
                    </Form.Group>
                </Col>
                <Col xs={12} md={4} className="d-flex align-items-end">
                    <div className="d-flex justify-content-around w-100">
                        <Button variant="outline-primary" size="sm" className="me-2" onClick={setToday}>Hoje</Button>
                        <Button variant="outline-primary" size="sm" className="me-2" onClick={setLast7Days}>Últimos 7 dias</Button>
                        <Button variant="outline-primary" size="sm" className="me-2" onClick={setLast15Days}>Últimos 15 dias</Button>
                        <Button variant="outline-primary" size="sm" onClick={setThisMonth}>Este mês</Button>
                    </div>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <FontAwesomeIcon icon={faMoneyBillWave} className="me-2" />
                                Total de Ganhos
                            </Card.Title>
                            <Card.Text>R$ {summaryData.totalEarnings.toFixed(2)}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <FontAwesomeIcon icon={faChartLine} className="me-2" />
                                Média por Hora (8h)
                            </Card.Title>
                            <Card.Text>R$ {(summaryData.averageEarningPerHour * 8).toFixed(2)}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <FontAwesomeIcon icon={faRoad} className="me-2" />
                                Média de KM por Dia
                            </Card.Title>
                            <Card.Text>{summaryData.averageKmPerDay.toFixed(2)} km</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <FontAwesomeIcon icon={faChartLine} className="me-2" />
                                Total KM Rodado
                            </Card.Title>
                            <Card.Text>{summaryData.totalKm.toFixed(2)} km</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col md={6}>
                    <h4 className="text-center mb-3">
                        <FontAwesomeIcon icon={faChartPie} className="me-2" />
                        Ganhos por Plataforma
                    </h4>
                    <Pie data={pieChartData} />
                </Col>
                <Col md={6}>
                    <h4 className="text-center mb-3">
                        <FontAwesomeIcon icon={faChartLine} className="me-2" />
                        KM por Plataforma
                    </h4>
                    <Bar data={barChartData} />
                </Col>
            </Row>

            <Row className="mb-4">
                <Col>
                    <h4 className="text-center mb-3">
                        <FontAwesomeIcon icon={faChartLine} className="me-2" />
                        Ganhos Diários
                    </h4>
                    <Line data={lineChartData} options={{
                        plugins: {
                            annotation: {
                                annotations: [{
                                    type: 'line',
                                    mode: 'horizontal',
                                    scaleID: 'y',
                                    value: dailyGoal,
                                    borderColor: 'red',
                                    borderWidth: 2,
                                    borderDash: [5, 5],
                                    label: {
                                        content: `Meta: R$${dailyGoal}`,
                                        enabled: true,
                                        position: 'end'
                                    }
                                }]
                            }
                        }
                    }} />
                </Col>
            </Row>

            <Table striped bordered hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th style={{ fontSize: '1.1rem' }}>Data</th>
                        <th style={{ fontSize: '1.1rem' }}>Turno</th>
                        <th style={{ fontSize: '1.1rem' }}>Valor (R$)</th>
                        <th style={{ fontSize: '1.1rem' }}>KM Rodado</th>
                        <th style={{ fontSize: '1.1rem' }}>Plataforma</th>
                        <th style={{ fontSize: '1.1rem' }}>Gorjeta (R$)</th>
                        <th style={{ fontSize: '1.1rem' }}>Descrição</th>
                        <th style={{ fontSize: '1.1rem' }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {earnings.map((earning) => {
                        const earningDate = earning.date.toDate();
                        const hour = earningDate.getHours();
                        const shiftIcon = getShiftIcon(hour);
                        const shiftName = getShiftName(hour);

                        return (
                            <tr key={earning.id}>
                                <td style={{ fontSize: '1rem' }}>
                                    <FontAwesomeIcon icon={shiftIcon} className="me-2" title={shiftName} />
                                    {earningDate.toLocaleDateString()} {earningDate.toLocaleTimeString()}
                                </td>
                                <td style={{ fontSize: '1rem' }}>{shiftName}</td>
                                <td style={{ fontSize: '1rem' }}>{earning.amount.toFixed(2)}</td>
                                <td style={{ fontSize: '1rem' }}>{earning.mileage.toFixed(2)}</td>
                                <td style={{ fontSize: '1rem' }}>{earning.platform}</td>
                                <td style={{ fontSize: '1rem' }}>{earning.tip ? earning.tip.toFixed(2) : '-'}</td>
                                <td style={{ fontSize: '1rem' }}>{earning.description || '-'}</td>
                                <td>
                                    <Button variant="warning" size="sm" className="me-2">
                                        <FontAwesomeIcon icon={faEdit} />
                                    </Button>
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(earning.id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            {earnings.length === 0 && <p className="text-center" style={{ fontSize: '1.1rem' }}>Nenhum ganho registrado para o período selecionado.</p>}
        </div>
    );
}

export default ListEarnings;
