import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, setDoc, getDoc, query, where, orderBy } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC9u70PEbq3rC4NDx57rR4A4IGPReY0TqY",
  authDomain: "diariomoto-8543b.firebaseapp.com",
  projectId: "diariomoto-8543b",
  storageBucket: "diariomoto-8543b.firebasestorage.app",
  messagingSenderId: "476460880603",
  appId: "1:476460880603:web:5ea74d97089e197c3e32fe",
  measurementId: "G-ZJZJ7X3MV0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Função para adicionar um ganho
async function addEarning(userId, earning) {
  const userRef = doc(db, 'users', userId);
  const earningsRef = collection(userRef, 'earnings');
  await addDoc(earningsRef, earning);
}

// Função para obter os ganhos de um usuário
async function getEarnings(userId) {
  const userRef = doc(db, 'users', userId);
  const earningsRef = collection(userRef, 'earnings');
  const q = query(earningsRef, orderBy('date', 'desc')); // Exemplo: ordenar por data decrescente
  const querySnapshot = await getDocs(q);
  const earnings = [];
  querySnapshot.forEach((doc) => {
    earnings.push({ id: doc.id, ...doc.data() });
  });
  return earnings;
}



// Função para adicionar uma manutenção
async function adicionarManutencao(userId, manutencao) {
  const userRef = doc(db, 'users', userId);
  const manutencoesRef = collection(userRef, 'manutencoes');
  await addDoc(manutencoesRef, manutencao);
}

// Função para obter as manutenções de um usuário
async function obterManutencoes(userId) {
  const userRef = doc(db, 'users', userId);
  const manutencoesRef = collection(userRef, 'manutencoes');
  const q = query(manutencoesRef, orderBy('data', 'desc'));
  const querySnapshot = await getDocs(q);
  const manutencoes = [];
  querySnapshot.forEach((doc) => {
    manutencoes.push({ id: doc.id, ...doc.data() });
  });
  return manutencoes;
}

// Função para registrar os dados da moto
async function registerBike(userId, bikeData) {
  const userRef = doc(db, 'users', userId);
  await setDoc(userRef, { bike: bikeData }, { merge: true });
}

// Função para obter os dados da moto de um usuário
async function getBikeData(userId) {
  const userRef = doc(db, 'users', userId);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    return docSnap.data().bike || null;
  } else {
    return null;
  }
}

// Função para obter os dados da moto de um usuário
async function obterDadosMoto(userId) {
  const userRef = doc(db, 'users', userId);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    return docSnap.data().moto || null;
  } else {
    return null;
  }
}

export { 
  db, 
  auth, 
  collection, 
  addDoc, 
  getDocs, 
  addEarning, 
  getEarnings, 
  registerBike, 
  getBikeData 
};
