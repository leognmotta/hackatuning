import React from 'react';
import styled, { keyframes } from 'styled-components';

import AnimatedLogo from '../../assets/Logo@animated.svg';

const rotate = keyframes`
  0%   {transform: rotate(0deg);}
  25%  {transform: rotate(90deg);}
  50%  {transform: rotate(180deg);}
  75%  {transform: rotate(270deg);}
  100% {transform: rotate(360deg);}
`;

const StyledLoadScreen = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background: linear-gradient(
      140deg,
      rgb(52, 140, 254) 0%,
      rgb(22, 61, 229) 93%,
      rgb(20, 55, 227) 100%
    )
    0% 0% no-repeat padding-box padding-box transparent;
  z-index: 100000000;

  img {
    width: 10vw;
    animation: ${rotate} 1.6s infinite;
    animation-timing-function: ease-out;
  }
`;

export default function LoadScreen() {
  return (
    <StyledLoadScreen>
      <img src={AnimatedLogo} alt="Animated svg logo" />
    </StyledLoadScreen>
  );
}
