import React, { useState } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useAuth } from '../USER/Auth/AuthContext';
import { addEarning } from '../DB/firebaseServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMoneyBillWave, faRoad, faEdit, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';

function RegisterEarnings() {
  const { currentUser } = useAuth();
  const [amount, setAmount] = useState('');
  const [mileage, setMileage] = useState('');
  const [platform, setPlatform] = useState(''); // Novo campo para a plataforma
  const [tip, setTip] = useState(''); // Novo campo para a gorjeta
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess(false);

    if (!amount || !mileage || !platform) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const earning = {
      date: new Date(), // Data e hora atuais
      amount: parseFloat(amount),
      mileage: parseFloat(mileage),
      platform,
      tip: tip ? parseFloat(tip) : 0, // Gorjeta opcional
      description,
    };

    try {
      await addEarning(currentUser.uid, earning);
      setSuccess(true);
      setAmount('');
      setMileage('');
      setPlatform('');
      setTip('');
      setDescription('');
    } catch (error) {
      setError('Erro ao registrar ganho. Tente novamente.');
      console.error("Erro ao adicionar ganho:", error);
    }
  };

  return (
    <div className="p-3"> {/* Padding para o pop-up */}
      <h2 className="text-center mb-4">
        <FontAwesomeIcon icon={faPlusCircle} className="me-2" />
        Registrar Ganhos
      </h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Ganho registrado com sucesso!</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label><FontAwesomeIcon icon={faMoneyBillWave} className="me-2" />Valor (R$):</Form.Label>
              <Form.Control
                type="number"
                placeholder="Digite o valor"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label><FontAwesomeIcon icon={faRoad} className="me-2" />KM Rodado:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Digite a quilometragem"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label><FontAwesomeIcon icon={faHandHoldingUsd} className="me-2" />Plataforma:</Form.Label>
          <Form.Select value={platform} onChange={(e) => setPlatform(e.target.value)} required>
            <option value="">Selecione a plataforma</option>
            <option value="Uber">Uber</option>
            <option value="99">99</option>
            <option value="Ifood">Ifood</option>
            <option value="Indrive">Indrive</option>
            <option value="Particular">Particular</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label><FontAwesomeIcon icon={faMoneyBillWave} className="me-2" />Gorjeta (opcional):</Form.Label>
          <Form.Control
            type="number"
            placeholder="Digite o valor da gorjeta"
            value={tip}
            onChange={(e) => setTip(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label><FontAwesomeIcon icon={faEdit} className="me-2" />Descrição (opcional):</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Descrição do ganho"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Registrar
        </Button>
      </Form>
    </div>
  );
}

export default RegisterEarnings;
