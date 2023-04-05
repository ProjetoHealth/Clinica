import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';


export const Container = styled(FormControl)`
  &.MuiFormControl-root{
    width: ${props => props.width ? props.width : "300px"};
  }
  .MuiChip-colorPrimary{
    background-color: #53c1ff;
  }
  .MuiFormLabel-root.Mui-focused{
    color: #53c1ff;
  }
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline{
    border-color: #53c1ff;
  }
`