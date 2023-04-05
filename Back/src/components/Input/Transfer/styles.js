import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

export const Container = styled.div`
  display: flex;
`
export const Content = styled(Paper)`
  margin: 0px 10px;
  .MuiFormControl-marginNormal{
    margin-top: 0px;
    margin-bottom: 0px;
  }
  .MuiFormControl-root{
    margin: 5px 5px;
  }
`
export const Times = styled.div`
  padding: 15px;
  min-height: 210px;
  min-width: 310px;
`
export const InputGroup = styled.div`
  display: flex;
`