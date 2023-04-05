import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

export const Content = styled(Paper)`
  padding: 25px;
  margin-bottom: 20px;
  h3{
    margin-block-start: 0;
  }
`
export const InputGroup = styled.div`
  display: flex;
  width: 100%;
  .MuiFormControl-marginNormal{
    margin-top: 0px;
    margin-bottom: 0px;
  }
  .MuiFormControl-root{
    margin: 5px 5px;
  }
`
export const Times = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`
