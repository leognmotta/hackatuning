import React from 'react';
import styled from 'styled-components';
import Input from './Input';
import TextArea from './TextArea';
import Button from './Button';
import Select from './Select';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

function Form({ onSubmit, ...props }) {
  return <StyledForm onSubmit={onSubmit} {...props} />;
}

export { Input, TextArea, Form, Button, Select };
