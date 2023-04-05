import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

export const Container = styled.div`
  margin: 15px;
`
export const Content = styled(Paper)`
  padding: 10px;
`
export const Scheduler = styled.div`
  width: 30%;
`
export const Describe = styled.div`
  margin: 5px;
  display: flex;
`
export const Appointments = styled.div`
  background-color: #53C1FF;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  span{
    color: white;
    font-size: 16px;
    font-weight: bold;
    cursor: default;
  }
`