import React from 'react';

import Logo from '../../../assets/Logo@negativo.svg';
import { Container } from './styles';

export default function Footer() {
  return (
    <Container>
      <img src={Logo} alt="Hackatuning Logo" />
    </Container>
  );
}
