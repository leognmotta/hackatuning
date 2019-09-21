import React from 'react';
import styled from 'styled-components';

const StyledSelect = styled.select``;

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
