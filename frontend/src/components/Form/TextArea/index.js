import React from 'react';
import styled from 'styled-components';

const StyledTextArea = styled.textarea`
  margin: 10px 0 10px 0;
  width: 100%;
  font-size: 14px;
  padding: 10px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 2px solid #cccccc;
  border-radius: 6px;
  opacity: 1;
  resize: none;

  &:focus {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 2px solid #1437e3;
    border-radius: 6px;
    opacity: 1;
  }
`;

export default function TextArea({ label, value, onChange, ...props }) {
  return (
    <label htmlFor={label} className="label">
      {label}
      <StyledTextArea id={label} value={value} onChange={onChange} {...props} />
    </label>
  );
}
