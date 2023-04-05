import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

export const Content = styled(Grid)`
  &.MuiGrid-container{
    width: ${props => props.width ? props.width : "100%"};
  }
`