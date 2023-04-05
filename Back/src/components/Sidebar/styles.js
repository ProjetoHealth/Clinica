import styled from 'styled-components';

export const Container = styled.div`
  background-color: #53C1FF;
  min-width: 300px;
`
export const Logo = styled.div`
  display: flex;
  justify-content: center;
  padding: 25px 0px;
`
export const User = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 25px;
  h2{
    margin: 0;
    color: white;
    font-size: 30px;
  }
  span{
    color: white;
  }
`
export const HorizontalLine = styled.div`
  border-bottom: 1px solid white;
  width: 100%;
`
export const Links = styled.div`
  padding: 0px 25px;
  ul{
    list-style-type: none;
    padding: 0;
  }
  li{
    display: flex;
    align-items: center;
    color: white;
    margin: 5px 0px;
    font-size: 18px;
  }
  a{
    text-decoration: none;
  }
  svg{
    margin: 0px 10px;
  }
`