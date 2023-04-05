import React from 'react';

import {
  Container,
  LinkStyle
} from './styles';

function Title({
  label,
  link,
  labelLink
}){
  return(
    <>
      <Container>
        <h1>{label}</h1>
        <LinkStyle to={link}>{labelLink}</LinkStyle>
      </Container>
    </>
  )
}
export default Title;