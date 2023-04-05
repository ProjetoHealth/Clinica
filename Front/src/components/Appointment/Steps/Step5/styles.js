import styled from 'styled-components';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';

export const Container = styled.div`
  height: calc(100% - 36px);
`
export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 25px;
`
export const Filters = styled.div`
  display: flex;
  align-items: center;
  button{
    margin-left: 10px;
    margin-top: 5px;
    min-width: 20px!important;
  }
`
export const DaysWeek = styled.span`
  font-size: 16px;
  font-weight: bold;
`
export const DaysMonth = styled.span`
  font-size: 25px;
  font-weight: bold;
`
export const Cell = styled(TableCell)`
  &.MuiTableCell-root{
    padding: 5px 20px;
  }
`
export const CellButton = styled.button`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100px;
  height: 35px;
  background-color: ${props => props.active && props.selected ? "#74e070" : props.active ? "#53c1ff": "#dadada"};
  border: none;
  border-radius: 5px;
  cursor: ${props => props.active ? "pointer" : "default"};
  outline: none;
  :focus{
    border: ${props => props.active ? "1px solid" : "none"};
  }
`
export const CellTime = styled.span`
  color: white;
  font-size: 17px;
  font-weight: bold;
`
export const CellAvailable = styled.span`
  background-color: white;
  border-radius: 4px;
  width: 20px;
  height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: bold;
`
export const Queue = styled.div`
  margin: 0px 20px;
`
export const QueueCard = styled(Paper)`
  padding: 30px;
  margin: 20px 0px;
  width: 300px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h2{
    margin: 0px;
  }
`
export const QueueCardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  button{
    margin-left: 10px;
    margin-top: 5px;
    min-width: 20px!important;
  }
`
export const QueueCardText = styled.span`
  font-size: 98px;
  font-weight: bold;
`