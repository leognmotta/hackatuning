import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  margin: 10px 0 10px 0;
  height: 40px;
  width: auto;
  color: #fff;
  background: transparent
    linear-gradient(140deg, #348cfe 0%, #163de5 93%, #1437e3 100%) 0% 0%
    no-repeat padding-box;
  border-radius: 6px;
  border: 0;
  font-weight: bold;
`;

export default function Button({ text = 'Button', type = 'submit', ...props }) {
  return (
    <StyledButton type={type} {...props}>
      {text}
    </StyledButton>
  );
}
