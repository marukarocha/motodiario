import React, { useState } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useAuth } from '../USER/Auth/AuthContext';
import { addEarning } from '../DB/firebaseServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMoneyBillWave, faRoad, faHandHoldingUsd, faClock } from '@fortawesome/free-solid-svg-icons';
import Cleave from 'cleave.js/react';
import Swal from 'sweetalert2';

function RegisterEarnings({ onClose }) {
    const { currentUser } = useAuth();
    const [amount, setAmount] = useState('');
    const [mileage, setMileage] = useState('');
    const [platform, setPlatform] = useState('');
    const [tip, setTip] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState(''); // Novo estado para a duração da corrida em minutos
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [showTipInput, setShowTipInput] = useState(false);
    const [showDescriptionInput, setShowDescriptionInput] = useState(false);
    const [customPlatform, setCustomPlatform] = useState('');

    const platformOptions = [
        { name: 'Uber', color: '#333333' },
        { name: '99', color: '#FF9900' },
        { name: 'Ifood', color: '#EA1D2C' },
        { name: 'Indrive', color: '#3CB371' },
        { name: 'Particular', color: '#696969' },
    ];

    const durationOptions = [
        { value: 5, label: '5 min' },
        { value: 10, label: '10 min' },
        { value: 15, label: '15 min' },
        { value: 20, label: '20 min' },
        { value: 25, label: '25 min' },
        { value: 30, label: '30 min' },
        { value: 45, label: '45 min' },
        { value: 60, label: '60 min' },
        { value: 75, label: '75 min' },
        { value: 90, label: '90 min' },
    ];

    const handleAmountChange = (event) => {
        const value = event.target.rawValue;
        setAmount(value);
    };

    const handleMileageChange = (event) => {
        const value = event.target.rawValue;
        setMileage(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess(false);

        if (!amount || !mileage || !platform || !duration) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor, preencha todos os campos obrigatórios.',
            });
            return;
        }

        const amountNumber = parseFloat(amount.replace('R$ ', '').replace('.', '').replace(',', '.'));
        const mileageNumber = parseFloat(mileage.replace('.', '').replace(',', '.'));
        const durationNumber = parseFloat(duration);

        if (isNaN(amountNumber) || isNaN(mileageNumber) || isNaN(durationNumber) || amountNumber <= 0 || mileageNumber <= 0 || durationNumber <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Os valores de ganho, quilometragem e duração devem ser números válidos e maiores que zero.',
            });
            return;
        }

        const selectedPlatform = platform === 'Outra' ? customPlatform : platform;

        const earning = {
            date: new Date(),
            amount: amountNumber,
            mileage: mileageNumber,
            platform: selectedPlatform,
            tip: tip ? parseFloat(tip) : 0,
            description,
            duration: durationNumber, // Adiciona a duração em minutos ao objeto earning
        };

        try {
            await addEarning(currentUser.uid, earning);
            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'Ganho registrado com sucesso!',
            }).then(() => {
                onClose();
            });
            setAmount('');
            setMileage('');
            setPlatform('');
            setTip('');
            setDescription('');
            setDuration(''); // Reseta o campo de duração
            setCustomPlatform('');
            setShowTipInput(false);
            setShowDescriptionInput(false);
        } catch (error) {
            console.error("Erro ao adicionar ganho:", error);
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Erro ao registrar ganho. Tente novamente.',
            });
        }
    };

    return (
        <div className="p-3">
            <h2 className="text-center mb-4">
                <FontAwesomeIcon icon={faPlusCircle} className="me-2" />
                Registrar Ganhos
            </h2>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <FontAwesomeIcon icon={faMoneyBillWave} className="me-2" />
                                Valor (R$):
                            </Form.Label>
                            <Cleave
                                options={{
                                    numeral: true,
                                    numeralThousandsGroupStyle: 'thousand',
                                    prefix: 'R$ ',
                                    numeralDecimalScale: 2,
                                    numeralDecimalMark: ',',
                                    delimiter: '.',
                                    numeralPositiveOnly: true,
                                }}
                                placeholder="Digite o valor"
                                value={amount}
                                onChange={handleAmountChange}
                                className="form-control"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <FontAwesomeIcon icon={faRoad} className="me-2" />
                                KM Rodado:
                            </Form.Label>
                            <Cleave
                                options={{
                                    numeral: true,
                                    numeralThousandsGroupStyle: 'thousand',
                                    numeralDecimalScale: 2,
                                    delimiter: '.',
                                    numeralPositiveOnly: true,
                                }}
                                placeholder="Digite a quilometragem"
                                value={mileage}
                                onChange={handleMileageChange}
                                className="form-control"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <FontAwesomeIcon icon={faClock} className="me-2" />
                                Duração (minutos):
                            </Form.Label>
                            <Form.Select value={duration} onChange={(e) => setDuration(e.target.value)} required>
                                <option value="">Selecione a duração</option>
                                {durationOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <FontAwesomeIcon icon={faHandHoldingUsd} className="me-2" />
                                Plataforma:
                            </Form.Label>
                            <Row>
                                {platformOptions.map((option) => (
                                    <Col key={option.name} xs={6} sm={4} md={6} lg={4}>
                                        <Button
                                            variant="light"
                                            className={`w-100 mb-2 ${platform === option.name ? 'active' : ''}`}
                                            style={{
                                                backgroundColor: platform === option.name ? option.color : '',
                                                color: platform === option.name ? (option.color === '#333333' || option.color === '#696969' ? '#FFFFFF' : '#000000') : '',
                                                border: '1px solid #ced4da',
                                                padding: '10px',
                                                fontSize: '1.1rem',
                                                fontWeight: 'bold',
                                                textTransform: 'uppercase',
                                                textAlign: 'center',
                                            }}
                                            onClick={() => setPlatform(option.name)}
                                        >
                                            {option.name}
                                        </Button>
                                    </Col>
                                ))}
                                <Col xs={6} sm={4} md={6} lg={4}>
                                    <Button
                                        variant="light"
                                        className={`w-100 mb-2 ${platform === 'Outra' ? 'active' : ''}`}
                                        style={{
                                            border: '1px solid #ced4da',
                                            padding: '10px',
                                            fontSize: '1.1rem',
                                            fontWeight: 'bold',
                                            textTransform: 'uppercase',
                                            textAlign: 'center',
                                        }}
                                        onClick={() => setPlatform('Outra')}
                                    >
                                        Outra
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Group>
                    </Col>
                </Row>

                {platform === 'Outra' && (
                    <Form.Group className="mb-3">
                        <Form.Label>Nome da Plataforma:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o nome da plataforma"
                            value={customPlatform}
                            onChange={(e) => setCustomPlatform(e.target.value)}
                            required
                        />
                    </Form.Group>
                )}

                <Form.Group className="mb-3">
                    <Form.Check
                        type="checkbox"
                        label="Recebeu gorjeta?"
                        checked={showTipInput}
                        onChange={(e) => setShowTipInput(e.target.checked)}
                    />
                    {showTipInput && (
                        <Form.Control
                            type="number"
                            placeholder="Digite o valor da gorjeta"
                            value={tip}
                            onChange={(e) => setTip(e.target.value)}
                        />
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Check
                        type="checkbox"
                        label="Adicionar descrição?"
                        checked={showDescriptionInput}
                        onChange={(e) => setShowDescriptionInput(e.target.checked)}
                    />
                    {showDescriptionInput && (
                        <Form.Control
                            as="textarea"
                            rows={2}
                            placeholder="Descrição do ganho"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    )}
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                    Registrar
                </Button>
            </Form>
        </div>
    );
}

export default RegisterEarnings;
