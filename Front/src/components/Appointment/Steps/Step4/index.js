import React, { useState } from 'react';
import { Controller } from '../../index';
import Title from '../../Title';
import InputText from '../../../Input/Text';
import InputSelect from '../../../Input/Select';
import InputDate from '../../../Input/Date';

import {
  Container,
  Content,
  Subtitle,
  InputGroup,
  ContentForm,
  FormItem
} from'./styles';

function formatDate(date) {
  let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

function Step4(props){

  const [patient, setForms] = useState(props.data)

  const handleCpf = (cpf) => {
    cpf=cpf.replace(/\D/g,"")
    cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
    cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
    cpf=cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
    return cpf
  }

  const handleTell = (tell) => {
    let r = tell.replace(/\D/g, "");
    r = r.replace(/^0/, "");

    if (r.length > 11) {
      r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 7) {
      r = r.replace(/^(\d\d)(\d{5})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
      r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else if (tell.trim() !== "") {
      r = r.replace(/^(\d*)/, "($1");
    }
    return r;
  }

  const handleCep = (cep) => {
    return cep.replace(/^([\d]{2})\.*([\d]{3})-*([\d]{3})/,"$1.$2-$3");
  }

  const validate = (temp) => {
    let keys = Object.keys(temp);
    let validade = keys.filter((key) => temp[key] === '');

    if (validade.length === 0){
      return true;
    } else {
      return false
    }
  }

  const handleForms = (e) => {
    if (e.target !== undefined){
      let value = e.target.value
      let name = e.target.name

      if(name === 'cpf'){
        value = handleCpf(value)
      } else if (name === 'tell') {
        value = handleTell(value)
      } else if (name === 'cep') {
        value = handleCep(value)
      }

      setForms({...patient, [name]: value})

    } else {
      setForms({
        ...patient,
        birthday: formatDate(e)
      })
    }
  }

  console.log(patient)

  return (
    <>
      <Container>
        <Title label={"Informe os Dados do Paciente."}/>
        <Content>
          <ContentForm>
            <FormItem>
              <Subtitle><span>Dados Básicos</span></Subtitle>
              <div>
                <InputGroup>
                  <InputText 
                    name={"name"}
                    label={"Nome"}
                    variant={"outlined"}
                    value={patient.name}
                    onChange={(e) => handleForms(e)}
                    fullWidth
                  />
                  <InputText 
                    name={"surname"}
                    label={"Sobrenome"}
                    variant={"outlined"}
                    value={patient.surname}
                    onChange={(e) => handleForms(e)}
                    fullWidth
                  />
                </InputGroup>
                <InputGroup>
                  <InputSelect 
                    name={"gender"}
                    label={"Gênero"}
                    width={'100%'}
                    value={patient.gender}
                    option={['Feminino','Masculino']}
                    onChange={(e) => handleForms(e)}
                  />
                  <InputDate 
                    name={"birthday"}
                    label={"Data de Nacimento"}
                    value={patient.birthday}
                    onChange={(e) => handleForms(e)}
                  />
                  <InputText 
                    name={"identity"}
                    label={"CPF"}
                    variant={"outlined"}
                    maxLength={14}
                    value={patient.identity}
                    onChange={(e) => handleForms(e)}
                    fullWidth
                  />
                </InputGroup>
                <InputGroup>
                  <InputText 
                    name={"email"}
                    type={"email"}
                    label={"E-mail"}
                    value={patient.email}
                    variant={"outlined"}
                    onChange={(e) => handleForms(e)}
                    fullWidth
                  />
                  <InputText 
                    name={"tell"}
                    label={"Telefone"}
                    variant={"outlined"}
                    maxLength={16}
                    value={patient.tell}
                    pacleHolder={"(xx) xxxx-xxxxx"}
                    onChange={(e) => handleForms(e)}
                    fullWidth
                  />
                </InputGroup>
              </div>
            </FormItem>
            <FormItem>
              <Subtitle><span>Endereço</span></Subtitle>
              <div>
                <InputGroup>
                  <InputText 
                    name={"cep"}
                    label={"CEP"}
                    variant={"outlined"}
                    maxLength={10}
                    value={patient.cep}
                    onChange={(e) => handleForms(e)}
                  />
                </InputGroup>
                <InputGroup>
                  <InputText 
                    name={"address"}
                    label={"Logradouro"}
                    variant={"outlined"}
                    value={patient.address}
                    onChange={(e) => handleForms(e)}
                    fullWidth
                  />
                  <InputText 
                    name={"number"}
                    label={"Número"}
                    variant={"outlined"}
                    value={patient.number}
                    onChange={(e) => handleForms(e)}
                  />
                </InputGroup>
                <InputGroup>
                  <InputText 
                    name={"district"}
                    label={"Bairro"}
                    variant={"outlined"}
                    value={patient.district}
                    onChange={(e) => handleForms(e)}
                    fullWidth
                  />
                  <InputText 
                    name={"city"}
                    label={"Cidade"}
                    variant={"outlined"}
                    value={patient.city}
                    onChange={(e) => handleForms(e)}
                    fullWidth
                  />
                  <InputSelect 
                    name={"state"}
                    label={"UF"}
                    value={patient.state}
                    option={["AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RO", "RS", "RR", "SC", "SE", "SP", "TO"]}
                    onChange={(e) => handleForms(e)}
                  />
                </InputGroup>
              </div>
            </FormItem>
          </ContentForm>
        </Content>
      </Container>
      <Controller {...props} data={{patient:patient, check: validate(patient)}}/>
    </>
  )
}
export default Step4;