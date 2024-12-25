Application Prompt and Documentation

Overview

This prompt serves as a guideline for creating a Progressive Web Application (PWA) tailored for motorbike delivery tracking and analytics, referred to as "MotoDiario." The application enables users to register their daily activities, track maintenance logs, monitor fuel consumption, and view analytical graphs of their earnings and kilometers traveled.

Prompt for LLM-based Generation (Bolt.diy or similar):

"Create a mobile-first Progressive Web Application (PWA) for motorbike delivery drivers. The app, named MotoDiario, should provide the following features:

User Authentication:

Allow users to register and log in securely using Firebase Authentication.

Store user-specific data in Firebase Firestore.

Dashboard Interface:

Display a user-friendly dashboard showing:

Daily earnings (split by app, e.g., Uber, 99,ifood).

Kilometers traveled.

Maintenance status and logs.

Graphical analytics (earnings, fuel usage).

Data Logging:

Enable users to log daily activities such as fuel consumption and maintenance updates.

Include forms with input validation and masked fields (e.g., currency, date).

Offline Capabilities:

Use service workers to allow the app to function offline.

Sync data with Firebase once online.

Add to Home Screen (A2HS):

Implement A2HS functionality with a custom app icon and a manifest.json file.

Include custom splash screens and icons for different devices.

Custom Design Elements:

Design with a clean and responsive UI using TailwindCSS.

Incorporate a dark mode toggle.

Use motorbike-themed graphics/icons in the interface.

Code Structure:

Organize components in folders for scalability (e.g., components/Dashboard, components/Auth, etc.).

Use React for frontend development and React Router for navigation."

GitHub Documentation Template

Project Name: MotoDiario

Description

MotoDiario is a Progressive Web Application (PWA) designed for motorbike delivery drivers to streamline the tracking of daily earnings, kilometers traveled, and maintenance logs. It integrates Firebase for backend functionality and TailwindCSS for responsive UI design.

Features

Authentication:

User registration and login via Firebase Authentication.

Dashboard:

Summary of daily activities.

Graphical data visualization.

Data Entry Forms:

Log fuel consumption and maintenance details.

Analytics:

Graphs for earnings and kilometers traveled.

Offline Support:

Access key functionalities without an internet connection.

PWA Integration:

Add to Home Screen with custom icons and splash screens.

Mobile-First Design:

Optimized for mobile devices with a clean, responsive interface.

Installation

Clone the repository:

git clone https://github.com/username/motodiario.git

Navigate to the project directory:

cd motodiario

Install dependencies:

npm install

Start the development server:

npm start

Firebase Configuration

Create a Firebase project at Firebase Console.

Set up Firestore, Authentication, and Hosting.

Replace the Firebase configuration in src/components/DB/firebaseConfig.js:

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};
export default firebaseConfig;

Project Structure

public/
├── icons/       # Custom icons for PWA
src/
├── components/
│   ├── Auth/     # Authentication components (Login, Register)
│   ├── Dashboard/
│   ├── Forms/    # Data entry forms
│   ├── Graphs/   # Data visualization components
│   ├── Alerts/   # Alert messages and modals
│   └── DB/       # Firebase services
├── App.js       # Main application file
├── index.js     # React entry point

