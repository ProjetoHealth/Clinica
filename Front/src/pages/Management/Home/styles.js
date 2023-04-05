import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

export const CardsGroup = styled.div`
  display: flex;
  border-bottom: 1px solid #a4a4a4;
`
export const Card = styled.div`
  background-color: ${props => props.color === "green" ? "#47FFDF" : "#475BFF"};
  border-radius: 5px;
  color: white;
  padding: 15px;
  margin: 10px 5px;
  h3{
    margin: 5px 0px;
  }
`
export const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 5px;
  span{
    font-size: 70px;
    font-weight: bold;
    margin-left: 30px;
  }
`
export const Filters = styled(Paper)`
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