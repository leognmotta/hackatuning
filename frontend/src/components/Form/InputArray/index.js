/* eslint-disable react/no-array-index-key */
import React from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import Input from '../Input';
import Button from '../Button';

export default function ArrayInput({
  values = [''],
  onChange,
  addField,
  removeField,
  label,
}) {
  return (
    <div>
      {values.map((value, index) => (
        <div key={index}>
          <Input
            value={value}
            label={label}
            onChange={e => onChange(e, index)}
          />
          <Button
            onClick={() => removeField(index)}
            type="button"
            text={<FaTimes />}
            color="red"
          />
        </div>
      ))}

      <Button onClick={addField} type="button" text={<FaPlus />} />
    </div>
  );
}
