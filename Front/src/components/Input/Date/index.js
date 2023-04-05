import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import {
  Content
} from './styles';

function InputDate({
  name,
  label,
  value,
  onChange,
  width
}) {

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Content container justify="space-around" width={width}>
        <KeyboardDatePicker
          id={name}
          name={name}
          label={label}
          variant="inline"
          inputVariant="outlined"
          format="dd/MM/yyyy"
          margin="normal"
          value={value}
          onChange={onChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Content>
    </MuiPickersUtilsProvider>
  );
}
export default InputDate;