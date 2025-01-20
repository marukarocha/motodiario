import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, setDoc, getDoc, query, where, orderBy } from 'firebase/firestore';
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
async function getEarnings(userId, startDate = null, endDate = null) {
  try {
      let q = collection(db, 'users', userId, 'earnings');

      if (startDate && endDate) {
          // Ajuste para considerar a hora nas datas de filtro
          const start = new Date(startDate);
          start.setHours(0, 0, 0, 0); // Define a hora para o início do dia
          const end = new Date(endDate);
          end.setHours(23, 59, 59, 999); // Define a hora para o final do dia

          q = query(q, where('date', '>=', start), where('date', '<=', end), orderBy('date', 'desc'));
      } else {
          q = query(q, orderBy('date', 'desc'));
      }

      const querySnapshot = await getDocs(q);
      const earnings = [];
      querySnapshot.forEach((doc) => {
          earnings.push({ id: doc.id, ...doc.data() });
      });
      return earnings;
  } catch (error) {
      console.error("Erro ao buscar ganhos:", error);
      throw error;
  }
}

// Função para deletar um ganho
async function deleteEarning(userId, earningId) {
    try {
        const earningRef = doc(db, 'users', userId, 'earnings', earningId);
        await deleteDoc(earningRef);
    } catch (error) {
        console.error("Erro ao deletar ganho:", error);
        throw error;
    }
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

// src/components/DB/firebaseServices.jsx
async function addFueling(userId, fuelingData) {
  try {
      // Adiciona o abastecimento como uma subcoleção do usuário
      const fuelingRef = await addDoc(collection(db, 'users', userId, 'abastecimentos'), fuelingData);
      return fuelingRef.id;
  } catch (error) {
      console.error("Erro ao adicionar abastecimento:", error);
      throw error;
  }
}


async function getFuelings(userId, filterDate = null) {
  try {
      let q = collection(db, 'users', userId, 'abastecimentos');

      if (filterDate) {
          const startOfDay = new Date(filterDate);
          startOfDay.setHours(0, 0, 0, 0); // Começo do dia
          const endOfDay = new Date(filterDate);
          endOfDay.setHours(23, 59, 59, 999); // Fim do dia

          q = query(q, where('data', '>=', startOfDay.toLocaleDateString('pt-BR')), where('data', '<=', endOfDay.toLocaleDateString('pt-BR')), orderBy('data', 'desc'));
      } else {
          q = query(q, orderBy('data', 'desc'));
      }

      const querySnapshot = await getDocs(q);
      const fuelings = [];
      querySnapshot.forEach((doc) => {
          fuelings.push({ id: doc.id, ...doc.data() });
      });
      return fuelings;
  } catch (error) {
      console.error("Erro ao buscar abastecimentos:", error);
      throw error;
  }
}

export { 
  db, 
  auth, 
  collection, 
  addDoc, 
  getDocs, 
  addEarning, 
  deleteEarning,
  getEarnings, 
  registerBike, 
  getBikeData,
  addFueling,
  getFuelings
 
};
