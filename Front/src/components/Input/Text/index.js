import React from 'react';

import {
  InputText
} from './styles'

function Text({
  name,
  label,
  variant,
  size,
  fullWidth,
  onChange,
  maxLength,
  value,
  type,
  pacleHolder
}) {

  return (
    <InputText 
      name={name}
      label={label}
      value={value}
      variant={variant}
      type={type}
      size={size}
      placeholder={pacleHolder}
      fullWidth={fullWidth}
      onChange={onChange}
      inputProps={{ maxLength: maxLength }}
    />
  );
}
export default Text;