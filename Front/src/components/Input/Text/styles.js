import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

export const InputText = styled(TextField)`
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button{
    display: none;
  }
  .MuiFormLabel-root.Mui-focused{
    color: #53c1ff;
  }
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline{
    border-color: #53c1ff;
  }
`