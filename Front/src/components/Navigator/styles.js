import styled from 'styled-components';

export const Container = styled.nav`
  padding: 5px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`
export const Menu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const ListLinks = styled.ul`
  display: flex;
  list-style: none;
  li, a{
    margin: 0px 5px;
    color: #888888;
    font-size: 18px;
    font-weight: bold;
    text-decoration: none;
  }
`
export const ButtonDiv = styled.div`
  margin: 0px 20px;
`
