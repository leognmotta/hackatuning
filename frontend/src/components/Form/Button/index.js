import React from 'react';
import styled from 'styled-components';
import Spinner from '../../Spinner';

const StyledButton = styled.button.attrs(props => ({
  disabled: props.loading || 0,
}))`
  font-size: 14px;
  font-family: 'Montserrat Alternates', sans-serif;
  margin: 10px 0 10px 0;
  height: 40px;
  padding: 10px 15px;
  display: block;
  color: #fff;
  font-size: 16px;
  background: ${props =>
    props.color
      ? props.color
      : `transparent
    linear-gradient(140deg, #348cfe 0%, #163de5 93%, #1437e3 100%) 0% 0%
    no-repeat padding-box;`};

  border-radius: 6px;
  border: 0;
  font-weight: bold;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export default function Button({
  text = 'Button',
  type = 'submit',
  spinnerSize = 20,
  loading = 0,
  color,
  onClick,
  ...props
}) {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      color={color}
      spinnerSize={spinnerSize}
      loading={loading}
      {...props}
    >
      {loading === 1 ? <Spinner size={spinnerSize} /> : text}
    </StyledButton>
  );
}
