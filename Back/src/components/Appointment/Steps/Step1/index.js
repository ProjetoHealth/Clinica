import React, { useState } from 'react';
import { Controller } from '../../index';
import InputText from '../../../Input/Text';

import {
  Container,
  Content,
  MainText,
  VerticalLine,
  ContentLogin,
  InputGroup
} from './styles';

const handleCpf = (cpf) => {
  cpf=cpf.replace(/\D/g,"")
  cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
  cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
  cpf=cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
  return cpf
}

function Step1(props){

  const [patient, setPatient] = useState('');

  const handlePatient = (e) => {
    setPatient(handleCpf(e.target.value))
  }

  return (
    <>
      <Container>
        <Content>
          <div>
            <ContentLogin>
              <MainText>Você já é um de nossos pacientes?</MainText><br/>
              <span>Se sim, informe os dados abaixo.</span>
            </ContentLogin>
            <InputGroup>
              <InputText 
                name={"cpf"}
                label={"CPF"}
                variant={"outlined"}
                value={patient}
                onChange={(e) => handlePatient(e)}
                fullWidth
              />
            </InputGroup>
          </div>
          <VerticalLine />
          <div>
            <MainText>É o seu primeiro agendamento?</MainText><br/>
            <span>Se sim, será um enorme atende-lo(a).</span><br/>
            <span>Clique em <label>"Próximo Passo"</label> para nos conhecermos melhor.</span>
          </div>
        </Content>
      </Container>
      <Controller {...props} data={{check: true}} patient={patient} />
    </>
  )
}
export default Step1;