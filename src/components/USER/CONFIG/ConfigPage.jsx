import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import UserConfig from './UserConfig';
import EarningConfig from './EarningConfig';
import AppConfig from './AppConfig'; // Importe o novo componente
import { db } from '../../DB/firebaseServices'; // Importe o db do seu firebaseServices
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from '../../USER/Auth/AuthContext';
import Swal from 'sweetalert2';
import './ConfigPage.css';

const ConfigPage = () => {
    const { currentUser } = useAuth();
    const [activeTab, setActiveTab] = useState('user');

    const saveData = async (data, type) => {
        if (!currentUser) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Usuário não autenticado.',
            });
            return;
        }

        const userRef = doc(db, 'users', currentUser.uid);

        try {
            // Salva os dados no documento do usuário, na subcoleção 'configurations'
            await setDoc(doc(userRef, 'configurations', type), data, { merge: true });
            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'Configurações salvas com sucesso!',
            });
        } catch (error) {
            console.error("Erro ao salvar configurações:", error);
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Erro ao salvar configurações. Tente novamente.',
            });
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Configurações</h2>
            <Tabs
                id="controlled-tab-example"
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="mb-3 justify-content-center"
            >
                <Tab eventKey="user" title="Usuário">
                    <UserConfig saveData={(data) => saveData(data, 'user')} />
                </Tab>
                <Tab eventKey="earnings" title="Ganhos">
                    <EarningConfig saveData={(data) => saveData(data, 'earnings')} />
                </Tab>
                <Tab eventKey="app" title="Aplicativo">
                    <AppConfig saveData={(data) => saveData(data, 'app')} />
                </Tab>
            </Tabs>
        </div>
    );
};

export default ConfigPage;
