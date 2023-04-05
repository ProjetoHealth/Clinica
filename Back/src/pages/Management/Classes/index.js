import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import { Store } from 'react-notifications-component';

import Title from '../../../components/Management/Title';
import Tables from '../../../components/Table';
import Queue from '../../../assets/img/icons/queue.png';

import api from '../../../services/api';

import {
  Container,
  Content,
  Describe,
  Appointments,
  Scheduler
} from './styles';

function Class(){

  const [classes, setClasses] = useState({
    data: [],
    reload: true
  })
  const columns = [
    { title: 'Criado em', field: 'create_date'},
    { title: 'Nome', field: 'name' },
    { title: 'Ano', field: 'year'},
    { title: 'Semestre', field: 'semester' },
    { title: 'Clínica', field: 'clinic' },
    { title: 'Especialidade', field: 'specialties' },
    { title: 'Professor(a)', field: 'teachers' },
  ]

  useEffect(() => {
    const getClasses = async() => {
      if(classes.reload){
        try {
          api.get('/turmas/all').then((response) => {
            setClasses({
              ...classes,
              data: response.data,
              reload: false
            })
          })
        } catch (error) {
          console.log(error)
        }
      }
    }
    getClasses()
  });

  const handleDelete = async(oldData) => {
    try{
      await api.delete('turmas/delete', {
        params: {
          data: oldData
        }
      }).then((response) => {
        if(response.data){
          Store.addNotification({
            title: 'Sucesso',
            message: 'Turma pagada com sucesso.',
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
          Store.addNotification({
            title: 'Error',
            message: 'Houve um problema ao apagar turma.',
            type: 'danger',
            insert: 'top',
            container: 'top-right',
            animationIn: ['animated', 'fadeIn'],
            animationOut: ['animated', 'fadeOut'],
            dismiss: {
              duration: 5000,
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
      <Title 
        label={'Turmas'}
        link={'/management/classes/add'}
        labelLink={'Criar uma nova turma'}
      />
      <div>
        <Tables 
          title={'Turmas Cadastradas'}
          columns={columns}
          data={classes.data}
          options={{ actionsColumnIndex: -1 }}
          editable={{
            onRowDelete: oldData => 
              new Promise((resolve) => {
                handleDelete(oldData)
                resolve()
              })
          }}
          detail={rowData => {
            return (
              <>
                <Container>
                  <Content>
                    <Scheduler>
                      <Describe>
                        <Tooltip title="Consultas por dia">
                          <Appointments>
                            <span>{rowData.appointments}</span>
                          </Appointments>                      
                        </Tooltip>
                        {rowData.queue &&
                          <Tooltip title="Possui fila de espera">
                            <img src={Queue} width="30px" alt=""/>
                          </Tooltip>
                        }
                      </Describe>   
                      <Paper>
                        <Table size="medium">
                          <TableHead>
                            <TableRow>
                              <TableCell align="center" size="small">Dia da Semana</TableCell>
                              <TableCell align="center" size="small">Início</TableCell>
                              <TableCell align="center" size="small">Fim</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rowData.times.map(time => (
                              <TableRow>
                                <TableCell align="center" size="small">{time.weekday}</TableCell>
                                <TableCell align="center" size="small">{time.start}</TableCell>
                                <TableCell align="center" size="small">{time.end}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Paper>
                    </Scheduler>
                  </Content>
                </Container>
              </>
            )
          }}
        />
      </div>
    </>
  )
}
export default Class;