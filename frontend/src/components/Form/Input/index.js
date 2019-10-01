import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  margin: 10px 0 15px 0;
  height: 40px;
  width: 100%;
  font-size: 15px;
  padding: 0 0 0 10px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 2px solid #cccccc;
  border-radius: 6px;

  &:focus {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 2px solid #1437e3;
    border-radius: 6px;
    opacity: 1;
  }
`;

export default function Input({ label, value, onChange, ...props }) {
  return (
    <label htmlFor={label} className="label">
      {label}
      <StyledInput id={label} value={value} onChange={onChange} {...props} />
    </label>
  );
}
