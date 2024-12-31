import React, { useState, useEffect } from 'react';
import { useAuth } from '../USER/Auth/AuthContext';
import { getEarnings } from '../DB/firebaseServices';
import { Table, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt } from '@fortawesome/free-solid-svg-icons';

function ListEarnings() {
  const { currentUser } = useAuth();
  const [earnings, setEarnings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const userEarnings = await getEarnings(currentUser.uid);
        setEarnings(userEarnings);
      } catch (error) {
        setError('Erro ao carregar os ganhos.');
        console.error("Erro ao obter ganhos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEarnings();
  }, [currentUser]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">
        <FontAwesomeIcon icon={faListAlt} className="me-2" />
        Lista de Ganhos
      </h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Data</th>
            <th>Valor (R$)</th>
            <th>KM Rodado</th>
            <th>Plataforma</th>
            <th>Gorjeta (R$)</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {earnings.map((earning) => (
            <tr key={earning.id}>
              <td>{earning.date.toDate().toLocaleString()}</td> {/* Formata data e hora */}
              <td>{earning.amount.toFixed(2)}</td>
              <td>{earning.mileage.toFixed(2)}</td>
              <td>{earning.platform}</td>
              <td>{earning.tip ? earning.tip.toFixed(2) : '-'}</td>
              <td>{earning.description || '-'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {earnings.length === 0 && <p>Nenhum ganho registrado.</p>}
    </div>
  );
}

export default ListEarnings;
