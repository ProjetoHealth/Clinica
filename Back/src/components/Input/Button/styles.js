import styled from 'styled-components';
import ButtonMUI from '@material-ui/core/Button';

export const Button = styled(ButtonMUI)`
  &.MuiButton-outlined{
    border-color: white;
    color: white;
  }
  &.MuiButton-contained{
    background-color: #ED3237;
    color: white;
  }
`