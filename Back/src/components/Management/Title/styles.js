import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid black;
  h1{
    margin: 0px;
  }
`
export const LinkStyle = styled(Link)`
  text-decoration: none;
  font-size: 15px;
  color: #53C1FF;
`