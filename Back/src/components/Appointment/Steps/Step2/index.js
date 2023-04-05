import React, { useState } from 'react';
import { Controller } from '../../index';
import Title from '../../Title';
import Card from '../../Cards';

import OdontoIcon from '../../../../assets/img/clinics/odonto.png';
import FisioIcon from '../../../../assets/img/clinics/fisio.png';
import NutriIcon from '../../../../assets/img/clinics/nutri.png';
import PsicoIcon from '../../../../assets/img/clinics/psico.png';

import {
  Container,
  Content
} from'./styles';

function Step2(props){

  const [clinic, setClinic] = useState({
    clinic: props.data,
    check: props.data === '' ? false : true
  });

  const handleClinic = (clinicSelected) => {
    setClinic({check: clinicSelected !== '' , clinic: clinicSelected})
  }

  const clinics = [
    {icon: OdontoIcon, name: "Odontologia"},
    {icon: FisioIcon, name: "Fisioterapia"},
    {icon: NutriIcon, name: "Nutrição"},
    {icon: PsicoIcon, name: "Psicologia"},
  ]

  return (
    <>
      <Container>
        <Title label={"Slecione uma Clínica."}/>
        <Content>
          {clinics.map((item) => {
            return (
              <Card
                icon={item.icon}
                name={item.name}
                label={item.name}
                onClick={() => handleClinic(item.name)}
                active={clinic.clinic !== '' ? clinic.clinic: ''}
              />
            )
          })}
        </Content>
      </Container>
      <Controller {...props} data={clinic}/>
    </>
  )
}
export default Step2;