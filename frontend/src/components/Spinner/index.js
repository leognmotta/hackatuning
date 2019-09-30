import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaSpinner } from 'react-icons/fa';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled(FaSpinner)`
  animation: ${rotate} 2s linear infinite;
`;

export default function Spinner({ size = 20 }) {
  return <StyledSpinner size={size} />;
}
