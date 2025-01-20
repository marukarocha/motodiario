import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhoneAlt, faIdCard } from '@fortawesome/free-solid-svg-icons';

const UserConfig = ({ saveData }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const handleSave = () => {
        saveData({
            name,
            phone,
        });
    };

    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title><FontAwesomeIcon icon={faUser} className="me-2" />Dados do Usuário</Card.Title>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label><FontAwesomeIcon icon={faPhoneAlt} className="me-2" />Telefone</Form.Label>
                        <Form.Control
                            type="tel"
                            placeholder="Telefone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={handleSave}>Salvar Dados</Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default UserConfig;
