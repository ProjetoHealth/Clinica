import React, { useState, useEffect } from 'react';
import { Controller } from '../../index';
import Title from '../../Title';
import Card from '../../Cards';
import api from '../../../../services/api';

import {
  Container,
  Content
} from'./styles';

function Step3(props){

  const [specialty, setSpecialty] = useState({
    specialty: props.data.specialty,
    check: props.data.specialty === '' ? false : true
  });

  const [specialties, setSpecialties] = useState({
    list: [],
    reload: true,
  })

  useEffect(() => {
    const getSpecialties = async() => {
      if(specialties.reload) {
        try{
          api.get('/appointments/specialties', {
            params: {
              clinic: props.data.clinic
            }
          }).then((response) => {
            setSpecialties({
              list: response.data.specialties,
              reload: false
            })
          })
        } catch (error) {
          console.log(error)
        }
      }
    }
    getSpecialties()
  })

  const handleSpecialty = (specialtySelected) => {
    setSpecialty({check: specialtySelected !== '', specialty: specialtySelected})
  }

  return (
    <>
      <Container>
        <Title label={"Selecione uma Especialidade."}/>
        <Content>
          {specialties.list.map((item) => {
            return (
              <Card
                name={item.name}
                clinic={props.data.clinic}
                label={item.name}
                desc={item.desc}
                onClick={() => handleSpecialty(item.name)}
                type={"specialties"}
                active={specialty.specialty !== '' ? specialty.specialty: ''}
              />
            )
          })}
        </Content>
      </Container>
      <Controller {...props} data={specialty}/>
    </>
  )
}
export default Step3;