import React, { useState, useEffect } from "react";
import "./Motivation.css"; // Para estilos personalizados, caso necessário

const phrases = [
  "Na frente da meta eu não posso errar — ('Vida Loka II')",
  "Viver, lutar, sofrer, vencer — ('Negro Drama')",
  "Jamais o brilho da favela se apagará — ('Jesus Chorou')",
  "Eu sei que o meu valor é mais que ouro e prata — ('Capítulo 4, Versículo 3')",
  "Cada lágrima que cai alimenta minha fé — ('Vida Loka I')",
  "Eu sou aquele louco que não pode errar — ('Negro Drama')",
  "A vida é um desafio, e cada um escolhe o seu caminho — ('A Vida é Desafio')",
  "Se você não tem motivo pra viver, não encontre pra morrer — ('Homem na Estrada')",
  "Paz interior é o que o homem busca — ('Periferia é Periferia')"
];

const Motivation = () => {
  const [phrase, setPhrase] = useState("");

  useEffect(() => {
    // Gera uma frase aleatória ao carregar o componente
    setPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
  }, []);

  return (
    <div className="motivation-container">
      <p className="motivation-phrase">"{phrase}"</p>
    </div>
  );
};

export default Motivation;
