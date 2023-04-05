import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${props => props.active ? "#d5d5d5" : "#53c1ff"};
  border-radius: 5px;
  padding: 20px;
  margin: 5px;
  width: 200px;
  height: ${props => props.type === "specialties" ? "175px" : "200px"};
  cursor: pointer;
  :hover{
    background-color: #d5d5d5;
  }
`
export const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.type === "specialties" ? "end" : "center"};
  align-items: ${props => props.type === "specialties" ? "baseline" : "center"};
  h2{
    margin: ${props => props.type === "specialties" ? "15px 0px" : "5px 0px"};
    color: white;
    font-size: 21px;
  }
  p{
    margin: 0px;
    color: white;
    font-size: 13px;
  }
`
