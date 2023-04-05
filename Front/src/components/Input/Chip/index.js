import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';

import {
  Container,
} from './styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function SelectChip({
  name,
  label,
  option,
  width,
  onChange,
  values
}) {

  return (
    <>
      <Container variant="outlined" width={width}>
        <InputLabel id={name}>{label}</InputLabel>
        <Select
          label={label}
          labelId={name}
          name={name}
          multiple
          value={values}
          onChange={onChange}
          renderValue={(selected) => (
            <div>
              {selected.map((value) => (
                <Chip key={value} label={value} color="primary"/>
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {option.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </Container>
    </>
  );
}
export default SelectChip;