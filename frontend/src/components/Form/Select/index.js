import React from 'react';
import styled from 'styled-components';

const StyledSelect = styled.select`
  margin: 10px 0 15px 0;
  height: 40px;
  width: 100%;
  font-size: 14px;
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

export default function Select({ options = [], label, onChange, ...props }) {
  return (
    <label htmlFor={label} className="label">
      {label}
      <StyledSelect id={label} onChange={onChange} {...props}>
        {options.map(opt => (
          <option key={opt.id} value={opt.id}>
            {opt.name}
          </option>
        ))}
      </StyledSelect>
    </label>
  );
}
