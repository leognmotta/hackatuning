import React from 'react';
import { Link } from 'react-router-dom';

// import { Container } from './styles';

export default function SignUp() {
  return (
    <>
      <form>
        <input placeholder="Nome Completo" />
        <input type="email" placeholder="Seu E-Mail aqui :)" />
        <input type="password" placeholder="Senha super secreta aqui!" />
        <textarea
          placeholder="Uma linda bio, use para se divulgar (insira contato se possivel ;))"
          maxLength="255"
        />

        <label>Selecione uma habilidade!</label>
        <select name="skill">
          <option>Front-End</option>
          <option>Back-End</option>
          <option>Fullstack</option>
          <option>Gestão</option>
          <option>Negócios</option>
          <option>Marketing</option>
          <option>UI/UX</option>
        </select>
      </form>
    </>
  );
}
