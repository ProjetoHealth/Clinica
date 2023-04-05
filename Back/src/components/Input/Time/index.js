import React from 'react';
import TextField from '@material-ui/core/TextField';


export default function TimePickers({
  name,
  label,
  onChange
}) {

  return (
    <form noValidate>
      <TextField
        label={label}
        name={name}
        onChange={onChange}
        variant='outlined'
        type="time"
        defaultValue="07:00"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
      />
    </form>
  );
}
