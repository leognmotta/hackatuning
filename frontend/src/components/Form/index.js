import React from 'react';
import styled from 'styled-components';
import Input from './Input';
import TextArea from './TextArea';
import Button from './Button';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

function Form({ ...props }) {
  return <StyledForm {...props} />;
}

export { Input, TextArea, Form, Button };
