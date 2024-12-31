import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Row, Col, Card } from 'react-bootstrap';
import { useAuth } from '../USER/Auth/AuthContext';
import { registerBike, getBikeData } from '../DB/firebaseServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMotorcycle, faCarSide, faTachometerAlt, faCalendarAlt, faPalette, faPlus, faOilCan, faWrench, faGasPump } from '@fortawesome/free-solid-svg-icons';
import InputMask from 'react-input-mask';

function RegisterBike() {
  const { currentUser } = useAuth();
  const [bikeData, setBikeData] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Informações da Moto
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [plate, setPlate] = useState('');
  const [color, setColor] = useState('');
  const [initialMileage, setInitialMileage] = useState('');

  // Manutenção
  const [oilChangeInterval, setOilChangeInterval] = useState(3000);
  const [relationChangeKm, setRelationChangeKm] = useState('');
  const [oilChangeKm, setOilChangeKm] = useState('');
  const [lubricationKm, setLubricationKm] = useState('');
  const [lastMaintenance, setLastMaintenance] = useState('');

  // Abastecimento
  const [tankVolume, setTankVolume] = useState('');

  // Dados para os selects (podem vir de um banco de dados posteriormente)
  const [models, setModels] = useState(['Modelo 1', 'Modelo 2', 'Modelo 3']); // Substitua pelos modelos reais
  const [colors, setColors] = useState(['Preto', 'Branco', 'Vermelho', 'Azul']); // Substitua pelas cores reais
  const [years, setYears] = useState(['2023', '2022', '2021', '2020']); // Substitua pelos anos reais

  useEffect(() => {
    const fetchBikeData = async () => {
      try {
        const data = await getBikeData(currentUser.uid);
        if (data) {
          setBikeData(data);
          // Preenche os campos com os dados existentes
          setMake(data.make || '');
          setModel(data.model || '');
          setYear(data.year || '');
          setPlate(data.plate || '');
          setColor(data.color || '');
          setInitialMileage(data.initialMileage || '');
          setOilChangeInterval(data.oilChangeInterval || 3000);
          setRelationChangeKm(data.relationChangeKm || '');
          setOilChangeKm(data.oilChangeKm || '');
          setLubricationKm(data.lubricationKm || '');
          setLastMaintenance(data.lastMaintenance || '');
          setTankVolume(data.tankVolume || '');
        }
      } catch (error) {
        console.error("Erro ao buscar dados da moto:", error);
      }
    };

    fetchBikeData();
  }, [currentUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess(false);

    const bike = {
      make,
      model,
      year: parseInt(year),
      plate,
      color,
      initialMileage: parseFloat(initialMileage),
      oilChangeInterval: parseInt(oilChangeInterval),
      relationChangeKm: parseFloat(relationChangeKm),
      oilChangeKm: parseFloat(oilChangeKm),
      lubricationKm: parseFloat(lubricationKm),
      lastMaintenance,
      tankVolume: parseFloat(tankVolume),
    };

    try {
      await registerBike(currentUser.uid, bike);
      setSuccess(true);
      setBikeData(bike);
    } catch (error) {
      setError('Erro ao registrar os dados da moto. Tente novamente.');
      console.error("Erro ao registrar moto:", error);
    }
  };

  return (
    <div className="container mt-5">
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={4} className="text-center">
              {/* Substitua por uma imagem real da moto, se disponível */}
              <FontAwesomeIcon icon={faMotorcycle} size="6x" className="text-primary" />
            </Col>
            <Col md={8}>
              <Card.Title>{make} {model}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{year}</Card.Subtitle>
              <Card.Text>
                <strong>Placa:</strong> {plate}<br />
                <strong>Cor:</strong> {color}<br />
                <strong>KM Inicial:</strong> {initialMileage}
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Dados da moto registrados com sucesso!</Alert>}

      <Form onSubmit={handleSubmit}>
        <div className="config-section mb-5">
          <h4 className="mb-3"><FontAwesomeIcon icon={faCarSide} className="me-2" />Informações da Moto</h4>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Marca:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite a marca da moto"
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Modelo:</Form.Label>
                <Form.Select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  required
                >
                  <option value="">Selecione o modelo</option>
                  {models.map((modelOption) => (
                    <option key={modelOption} value={modelOption}>
                      {modelOption}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Ano:</Form.Label>
                <Form.Select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                >
                  <option value="">Selecione o ano</option>
                  {years.map((yearOption) => (
                    <option key={yearOption} value={yearOption}>
                      {yearOption}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Placa:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite a placa da moto"
                  value={plate}
                  onChange={(e) => setPlate(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Cor:</Form.Label>
                <Form.Select
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  required
                >
                  <option value="">Selecione a cor</option>
                  {colors.map((colorOption) => (
                    <option key={colorOption} value={colorOption}>
                      {colorOption}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Quilometragem Inicial (km):</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Digite a quilometragem inicial"
                  value={initialMileage}
                  onChange={(e) => setInitialMileage(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
        </div>

        <div className="config-section mb-5">
          <h4 className="mb-3"><FontAwesomeIcon icon={faWrench} className="me-2" />Manutenção</h4>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Troca da Relação (km):</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Digite a quilometragem da troca da relação"
                  value={relationChangeKm}
                  onChange={(e) => setRelationChangeKm(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Troca de Óleo (km):</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Digite a quilometragem da troca de óleo"
                  value={oilChangeKm}
                  onChange={(e) => setOilChangeKm(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Lubrificação da Relação (km):</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Digite a quilometragem da lubrificação da relação"
                  value={lubricationKm}
                  onChange={(e) => setLubricationKm(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Última Manutenção:</Form.Label>
                <Form.Control
                  type="date"
                  value={lastMaintenance}
                  onChange={(e) => setLastMaintenance(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
        </div>

        <div className="config-section mb-5">
          <h4 className="mb-3"><FontAwesomeIcon icon={faGasPump} className="me-2" />Abastecimento</h4>
          <Form.Group className="mb-3">
            <Form.Label>Capacidade do Tanque (litros):</Form.Label>
            <Form.Control
              type="number"
              placeholder="Digite a capacidade do tanque"
              value={tankVolume}
              onChange={(e) => setTankVolume(e.target.value)}
            />
          </Form.Group>
        </div>

        <Button variant="primary" type="submit" className="w-100">
          {bikeData ? 'Atualizar Informações' : 'Registrar Moto'}
        </Button>
      </Form>
    </div>
  );
}

export default RegisterBike;