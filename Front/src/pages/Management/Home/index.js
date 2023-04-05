import React, { useState, useEffect } from 'react';
import {Today, EventAvailable} from '@material-ui/icons';
import { store } from 'react-notifications-component';
import Tables from '../../../components/Table';
import api from '../../../services/api';

import {
  CardsGroup,
  Card,
  CardContent
} from './styles';

function Team(){

  const [scheduling, setScheduling] = useState({
    data: [],
    completed: '',
    confirmed: '',
    scheduled: '',
    reload: true
  })
  const columns = [
    { title: 'Paciente', field: 'patient',  editable: 'never'},
    { title: 'E-mail', field: 'email', editable: 'never'},
    { title: 'Contato', field: 'tell', editable: 'never'},
    { title: 'Date', field: 'date', editable: 'never'},
    { title: 'Dia', field: 'weekday', editable: 'never'},
    { title: 'Hora', field: 'time', editable: 'never'},
    { title: 'Clínica', 
      field: 'clinic_id', 
      lookup: {
        0: 'Não se aplica',
        1: 'Medicina', 
        2: 'Odontologia',
        3: 'Fisioterapia',
        4: 'Nutrição',
        5: 'Psicologia'
      },
      editable: 'never'
    },
    { title: 'Especialidade', field: 'specialties', editable: 'never'},
    { title: 'Status', 
      field: 'status',
      lookup: {
        0: 'Não confirmada',
        1: 'Confirmada', 
      },
    },
  ]

  useEffect(() => {
    const getScheduling = async() => {
      if(scheduling.reload){
        try {
          await api.get('/scheduling').then((response) => {
            setScheduling({
              completed: response.data.completed,
              confirmed: response.data.confirmed,
              scheduled: response.data.scheduled,
              data: response.data.scheduling,
              reload: false
            })
          })
        } catch (error) {
          console.log(error)
        }
      }
    }
    getScheduling()
  });

  const handleUpdate = async(data) => {
    try {
      await api.put('scheduling', data).then((response) => {
        if(response.data.response){
          store.addNotification({
            title: 'Sucesso',
            message: response.data.message,
            type: 'success',
            insert: 'top',
            container: 'top-right',
            animationIn: ['animated', 'fadeIn'],
            animationOut: ['animated', 'fadeOut'],
            dismiss: {
              duration: 2000,
              onScreen: true,
            },
          });
          setTimeout(function(){ window.location.reload(); }, 2000);
        } else {
          store.addNotification({
            title: 'Error',
            message: response.data.message,
            type: 'danger',
            insert: 'top',
            container: 'top-right',
            animationIn: ['animated', 'fadeIn'],
            animationOut: ['animated', 'fadeOut'],
            dismiss: {
              duration: 2000,
              onScreen: true,
            },
          });
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async(data) => {
    try {
      await api.delete('scheduling', {
        params: {
          data: data
        }
      }).then((response) => {
        if(response.data.response){
          store.addNotification({
            title: 'Sucesso',
            message: response.data.message,
            type: 'success',
            insert: 'top',
            container: 'top-right',
            animationIn: ['animated', 'fadeIn'],
            animationOut: ['animated', 'fadeOut'],
            dismiss: {
              duration: 2000,
              onScreen: true,
            },
          });
          setTimeout(function(){ window.location.reload(); }, 2000);
        } else {
          store.addNotification({
            title: 'Error',
            message: response.data.message,
            type: 'danger',
            insert: 'top',
            container: 'top-right',
            animationIn: ['animated', 'fadeIn'],
            animationOut: ['animated', 'fadeOut'],
            dismiss: {
              duration: 2000,
              onScreen: true,
            },
          });
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return(
    <>
      <div>
        <CardsGroup>
          <Card>
            <h3>Consultas Agendadas</h3>
            <CardContent>
              <span>{scheduling.scheduled}</span>
              <Today style={{ fontSize: 55 }}/>
            </CardContent>
          </Card>
          <Card>
            <h3>Consultas Confirmadas</h3>
            <CardContent>
              <span>{scheduling.confirmed}</span>
              <EventAvailable style={{ fontSize: 55 }}/>
            </CardContent>
          </Card>
          <Card>
            <h3>Consultas Realizadas</h3>
            <CardContent>
              <span>{scheduling.completed}</span>
              <EventAvailable style={{ fontSize: 55 }}/>
            </CardContent>
          </Card>
        </CardsGroup>
        <div>
          <Tables 
            title={'Consultas Agendadas'}
            columns={columns}
            data={scheduling.data}
            options={{ actionsColumnIndex: -1 }}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  handleUpdate(newData)
                  resolve();
                }),
              onRowDelete: oldData => 
                new Promise((resolve) => {
                  handleDelete(oldData)
                  resolve()
                })
            }}
          />
        </div>
      </div>
    </>
  )
}
export default Team;