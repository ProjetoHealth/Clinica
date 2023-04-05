import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

export const Container = styled(Paper)`
  &.MuiPaper-root{
    padding: 20px;
    margin: 15px 5px;
  }
  h2{
    margin-block-start: 0px;
    margin-block-end: 10px;
  }
`
export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0px;
  .MuiFormControl-marginNormal{
    margin-top: 0px;
    margin-bottom: 0px;
  }
  .MuiFormControl-root{
    margin: 5px 5px;
  }
`
export const ContentButton = styled.div`
  display: flex;
  justify-content: flex-end;
`