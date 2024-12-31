# Application Prompt and Documentation

## Overview

This prompt serves as a guideline for creating a Progressive Web Application (PWA) tailored for motorbike delivery tracking and analytics, referred to as "MotoDiario." The application enables users to register their daily activities, track maintenance logs, monitor fuel consumption, and view analytical graphs of their earnings and kilometers traveled.

---

## Prompt for LLM-based Generation (Bolt.diy or similar):

"Create a mobile-first Progressive Web Application (PWA) for motorbike delivery drivers. The app, named MotoDiario, should provide the following features:

1. **User Authentication:**

   - Allow users to register and log in securely using Firebase Authentication.
   - Store user-specific data in Firebase Firestore.

2. **Dashboard Interface:**

   - Display a user-friendly dashboard showing:
     - Daily earnings (split by app, e.g., Uber, 99,ifood).
     - Kilometers traveled.
     - Maintenance status and logs.
     - Graphical analytics (earnings, fuel usage).

3. **Data Logging:**

   - Enable users to log daily activities such as fuel consumption and maintenance updates.
   - Include forms with input validation and masked fields (e.g., currency, date).

4. **Offline Capabilities:**

   - Use service workers to allow the app to function offline.
   - Sync data with Firebase once online.

5. **Add to Home Screen (A2HS):**

   - Implement A2HS functionality with a custom app icon and a manifest.json file.
   - Include custom splash screens and icons for different devices.

6. **Custom Design Elements:**

   - Design with a clean and responsive UI using TailwindCSS.
   - Incorporate a dark mode toggle.
   - Use motorbike-themed graphics/icons in the interface.

7. **Code Structure:**

   - Organize components in folders for scalability (e.g., `components/Dashboard`, `components/Auth`, etc.).
   - Use React for frontend development and React Router for navigation."

---

## GitHub Documentation Template

### Project Name: MotoDiario

#### Description

MotoDiario is a Progressive Web Application (PWA) designed for motorbike delivery drivers to streamline the tracking of daily earnings, kilometers traveled, and maintenance logs. It integrates Firebase for backend functionality and TailwindCSS for responsive UI design.

---

### Features

1. **Authentication:**
   - User registration and login via Firebase Authentication.
2. **Dashboard:**
   - Summary of daily activities.
   - Graphical data visualization.
3. **Data Entry Forms:**
   - Log fuel consumption and maintenance details.
4. **Analytics:**
   - Graphs for earnings and kilometers traveled.
5. **Offline Support:**
   - Access key functionalities without an internet connection.
6. **PWA Integration:**
   - Add to Home Screen with custom icons and splash screens.
7. **Mobile-First Design:**
   - Optimized for mobile devices with a clean, responsive interface.

---

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/username/motodiario.git
   ```
2. Navigate to the project directory:
   ```bash
   cd motodiario
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

---

### Firebase Configuration

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Set up Firestore, Authentication, and Hosting.
3. Replace the Firebase configuration in `src/components/DB/firebaseConfig.js`:
   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-app.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "your-messaging-sender-id",
     appId: "your-app-id"
   };
   export default firebaseConfig;
   ```

---
# Documentação para o Projeto

Este documento descreve a estrutura de pastas atualizada do projeto, explica as mudanças realizadas e orienta sobre como outros desenvolvedores podem contribuir.

---

## Estrutura de Pastas Atualizada

### Diretório `src/`

```
src/
├── App.css                 // Estilo global
├── App.js                  // Componente raiz
├── App.test.js             // Testes unitários
├── components/             // Componentes reutilizáveis
│   ├── Auth/               // Lógica e componentes de autenticação
│   │   ├── AuthContext.jsx  // Contexto de autenticação (inclui funções de login/logout)
│   ├── Bike/               // Componentes relacionados à moto
│   │   ├── RegisterBike.jsx // Formulário para registrar dados da moto
│   │   └── ViewBike.jsx     // Visualização dos dados da moto
│   ├── DB/                 // Lógica de interação com o banco de dados Firebase
│   │   └── firebaseServices.js // Funções gerais para comunicação com o Firestore
│   ├── Earnings/           // Registro e consulta de ganhos
│   │   ├── RegisterEarnings.jsx // Formulário de registro
│   │   └── ListEarnings.jsx    // Listagem e consulta
│   ├── Fuelings/           // Registro e consulta de abastecimentos
│   │   ├── RegisterFueling.jsx // Formulário de registro
│   │   └── ListFuelings.jsx    // Listagem e consulta
│   ├── Maintenances/       // Registro e consulta de manutenções
│   │   ├── RegisterMaintenance.jsx // Formulário de registro
│   │   └── ListMaintenances.jsx    // Listagem e consulta
│   ├── UI/                 // Componentes de interface do usuário
│   │   ├── Header.jsx       // Cabeçalho com suporte a logout
│   │   ├── BackToHomeButton.jsx // Botão para retornar à página inicial
│   │   └── SummaryCard.js  // Cartão resumo de dados
│   ├── GPS/                // Componentes de rastreamento de distância
│   │   ├── calculateDistance.js
│   │   ├── GPSDistanceTracker.jsx
│   │   └── useGPS.js
│   ├── WEATHER/            // Componentes relacionados à meteorologia
│   │   ├── tempo.css
│   │   ├── Tempo.jsx
│   │   ├── useWeather.js
│   │   └── WeatherCard.jsx
├── pages/                  // Páginas principais
│   └── LandingPage.jsx     // Página de entrada com login e registro
├── index.css               // Estilos globais
├── index.js                // Ponto de entrada da aplicação
├── logo.png                // Logo
├── logo.svg                // Logo em SVG
├── reportWebVitals.js      // Ferramenta de medição de desempenho
└── setupTests.js           // Configurações de testes
```

---

## Componentes Atualizados ou Novos

### **AuthContext.jsx**
- Mesclado a partir de USER/Auth/AuthContext.jsx e USER/Auth/auth.jsx.
- Implementa funções de login e logout.

### **Bike/**
- **RegisterBike.jsx**: Permite o registro de dados sobre a moto do usuário.
- **ViewBike.jsx**: Exibe os dados registrados sobre a moto.

### **DB/firebaseServices.js**
- Mescla funções anteriores de interação com o Firestore.
- Inclui novas funções para Earnings, Fuelings e Maintenances.

### **Earnings/**
- **RegisterEarnings.jsx**: Formulário para registro de ganhos.
- **ListEarnings.jsx**: Exibe e consulta ganhos registrados.

### **Fuelings/**
- **RegisterFueling.jsx**: Formulário para registrar abastecimentos.
- **ListFuelings.jsx**: Exibe e consulta registros de abastecimento.

### **Maintenances/**
- **RegisterMaintenance.jsx**: Formulário para registrar manutenções.
- **ListMaintenances.jsx**: Exibe e consulta registros de manutenções.

---

## Contribuição

### **Requisitos**
- Node.js 16+
- Firebase SDK configurado

### **Passos para Configuração**
1. Clone o repositório:
   ```bash
   git clone <URL-do-repositório>
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as credenciais do Firebase em `src/components/DB/firebaseServices.js`.

### **Padrões de Código**
- **Estilo**: Utilize ESLint e Prettier para uniformizar o código.
- **Commits**: Escreva mensagens de commit descritivas em inglês.

### **Como Contribuir**
1. Crie um branch para sua contribuição:
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```
2. Desenvolva e teste sua funcionalidade.
3. Abra um Pull Request detalhando as mudanças realizadas.

---

## Roadmap Futuro

1. Finalizar a implementação dos novos componentes.
2. Criar testes unitários para os novos componentes.
3. Melhorar a documentação sobre integração com o Firebase.

Com essa estrutura e orientações, o projeto está preparado para crescer e receber contribuições de outros desenvolvedores.



Com essa estrutura e orientações, o projeto está preparado para crescer e receber contribuições de outros desenvolvedores.


