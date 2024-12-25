import React, { useState } from "react";
import { registerUser } from "../../DB/firebaseServices"; // Caminho corrigido

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, password);
      alert("Usuário registrado com sucesso!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Registrar</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Register;
