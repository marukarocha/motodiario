import React, { useState } from 'react';
import { FaUser, FaPhoneAlt, FaIdCard } from 'react-icons/fa';
import { Button, Card, Form } from 'react-bootstrap';

const UserConfig = ({ saveData }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [cnh, setCnh] = useState({ number: '', validity: '', category: '' });

    const handleSave = () => {
        saveData({
            name,
            email,
            phone,
            cnh,
        });
    };

    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title><FaUser /> Dados do Usuário</Card.Title>
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
                        <Form.Label><FaIdCard /> E-mail</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label><FaPhoneAlt /> Telefone</Form.Label>
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
