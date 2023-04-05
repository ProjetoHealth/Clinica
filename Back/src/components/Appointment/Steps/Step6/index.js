import React from 'react';
import { Controller } from '../../index';
import Title from '../../Title';

import {
  Container,
  Content
} from'./styles';

function Step6(props){
  return (
    <>
      <Container>
        <Title label={"Termos e Condições."}/>
        <Content>
        </Content>
      </Container>
      <Controller {...props} data={{submit: true, check:true}} forms={props.data}/>
    </>
  )
}
export default Step6;