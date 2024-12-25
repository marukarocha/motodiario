import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

// Função para registrar um usuário
export const registerUser = async (email, password, userData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Salvar dados adicionais no Firestore
    await setDoc(doc(db, "users", user.uid), userData);

    console.log("Usuário registrado e dados salvos!");
    return user;
  } catch (error) {
    console.error("Erro ao registrar usuário:", error.message);
    throw error;
  }
};
