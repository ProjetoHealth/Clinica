import styled from 'styled-components';
import Banner from '../../assets/img/banner.png'

export const Container = styled.div`
  background-image: url(${Banner});
  background-repeat: no-repeat;
  background-size: cover;
  height: calc(100vh - 363px);
`
export const Content = styled.div`
  height: inherit;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Description = styled.div`
  padding-left: 100px;
  margin-top: -250px;
  margin-left: -50px;
  h1{
    color: #FFFFFF;
    margin: 0;
    margin-bottom: 5px;
    font-size: 65px;
    font-weight: bold;
  }
  p{
    margin: 0;
    padding-left: 5px;
    color: #FFFFFF;
  }
`