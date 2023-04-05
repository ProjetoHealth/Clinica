import React from 'react';
import Title from '../../Title';

import {
  Container,
  Content,
  Card,
  CardTitle,
  CardSubtitle
} from './styles';

function Step1(props){
  const patient = props.data.patient;
  const appointment = props.data.appointment
  const clinic = props.data.clinic
  const specialty = props.data.specialty

  return (
    <>
      <Container>
        <Title label={"Agendamento Concluído!"}/>
        <Content>
          <div>
            <Card>
              <CardTitle>Dados do Paciente</CardTitle>
              <CardSubtitle>Nome: </CardSubtitle><span>{patient.name + " " + patient.surname}</span><br/>
              <CardSubtitle>E-mail: </CardSubtitle><span>{patient.email}</span><br/>
              <CardSubtitle>Contato: </CardSubtitle><span>{patient.tell}</span><br/>
            </Card>
            <Card>
              <CardTitle>Dados do Agendamento</CardTitle>
              <CardSubtitle>Clínca: </CardSubtitle><span>{clinic}</span><br/>
              <CardSubtitle>Especialidade: </CardSubtitle><span>{specialty}</span><br/>
              <CardSubtitle>Agendamento: </CardSubtitle><span>{appointment.queue ? 'Fila de espera.' :  appointment.date + " - " + appointment.weekday + " às " + appointment.time}</span><br/>
            </Card>
          </div>
        </Content>
      </Container>
    </>
  )
}
export default Step1;