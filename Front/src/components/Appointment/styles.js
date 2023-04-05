import styled from 'styled-components';
import PaperMUI from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

export const Container = styled.div`
  width: 100%;
`
export const Paper = styled(PaperMUI)`
  &.MuiPaper-root{
    padding: 20px;
    min-height: calc(100vh - 230px);
    display: flex;
  }
`
export const ContentButton = styled.div`
  display: flex;
  justify-content: ${props => props.isFirstStep ? "flex-end" : "space-between"};
`
export const ButtonMUI = styled(Button)`
  .MuiButton-label{
    color: #53c1ff;
  }
`
export const ContentStep = styled.div`
  padding: 15px 30px;
  width: 100%;
`
export const ContentTitle =  styled.div`
  h1{
    margin: 0px;
  }
`