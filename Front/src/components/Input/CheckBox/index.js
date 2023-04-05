import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function CheckboxLabels({
  name,
  value,
  label,
  onChange,
  onClick
}) {

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={value}
            onChange={onChange}
            name={name}
          />
        }
        label={label}
        onClick={onClick}
      />
    </FormGroup>
  );
}
