import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import api from '../../../../services/api';

import { Controller } from '../../index';
import Title from '../../Title';
import Button from '../../../Input/Button';
import InputDate from '../../../Input/Date';

import {
  Container,
  Content,
  Filters,
  DaysWeek,
  DaysMonth,
  Cell,
  CellButton,
  CellTime,
  CellAvailable,
  Queue,
  QueueCard,
  QueueCardContent,
  QueueCardText
} from'./styles';

function getWeekdays(date) {
  let week = []; 
  let weekdays = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
  for (let i = 0; i < 7; i++) {

      let weekday = date.getDay();
      let day = date.getDate().toString().length < 2 ? '0'+date.getDate().toString():date.getDate().toString();
      let month = date.getMonth().toString().length < 2 ? '0'+(date.getMonth()+1).toString():(date.getMonth()+1).toString();
      let year = date.getFullYear();

      week.push(
        [weekdays[weekday] , day, [year,month,day].join('-')]
      )
      date.setDate(date.getDate() + 1);
  }
  return week; 
}
function formatDate(date) {
  let weekdays = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
  let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [weekdays[d.getDay()], [year, month, day].join('-')];
}
function datediff(first, second) {
  return Math.round((second-first)/(1000*60*60*24));
}

function Step5(props){
  const {pathname} = useLocation();
  const today = new Date()
  const [dateSelected, setDateSelected] = useState(new Date())
  const weekdays = getWeekdays(new Date(dateSelected))
  const [appointment, setAppointment] = useState(props.data.appointment)
  const clinic = props.data.clinic
  
  const [schedules, setSchedules] = useState({
    schedule: [],
    reload: true,
  })

  useEffect(() => {
    const getSpecialties = async() => {
      
      if(schedules.reload) {
        try{
          api.get('/appointments/agenda', {
            params: {
              dateSelected: formatDate(dateSelected)[1],
              specialty: props.data.specialty
            }
          }).then((response) => {
            setSchedules({
              schedule: response.data.schedule,
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

  const handleDate = (e) => {
    setDateSelected(e)
    setSchedules({
      ...schedules,
      reload: true
    })
  }

  const handleNextWeek = () => {
    setDateSelected(new Date(dateSelected.setDate(dateSelected.getDate() + 7)))
    setSchedules({
      ...schedules,
      reload: true
    })
  }

  const handleAppointment = (time, weekday, date) => {
    setAppointment({
      date: date,
      weekday: weekday,
      time: time,
      queue: false
    })
  }

  const handleScheduler = () => {
    if (schedules.schedule.length > 0){
      let range = schedules.schedule[0].d0.length
      let columns = [...Array(range).keys()];
  
      return columns.map(col => (
        schedules.schedule.map(row => {
          return (
            <TableRow>
              <Cell align="center">
                {!['Sáb','Dom'].includes(weekdays[0][0]) &&
                  <CellButton 
                    selected={weekdays[0][2] === appointment.date && row.d0[col].time === appointment.time}
                    active={row.d0[col].active} 
                    onClick={() => handleAppointment(row.d0[col].time, weekdays[0][0], weekdays[0][2])}
                  >
                    <CellTime>{row.d0[col].time}</CellTime>
                    {pathname === '/management/appointment' &&
                      <CellAvailable>{row.d0[col].available}</CellAvailable>
                    }
                  </CellButton>
                }
              </Cell>
              <Cell align="center">
                {!['Sáb','Dom'].includes(weekdays[1][0]) &&
                  <CellButton 
                    selected={weekdays[1][2] === appointment.date && row.d1[col].time === appointment.time}
                    active={row.d1[col].active} 
                    onClick={() => handleAppointment(row.d0[col].time, weekdays[1][0], weekdays[1][2])}
                  >
                    <CellTime>{row.d1[col].time}</CellTime>
                    {pathname === '/management/appointment' &&
                      <CellAvailable>{row.d1[col].available}</CellAvailable>
                    }
                  </CellButton>
                }
              </Cell>
              <Cell align="center">
                {!['Sáb','Dom'].includes(weekdays[2][0]) &&
                  <CellButton 
                    selected={weekdays[2][2] === appointment.date && row.d2[col].time === appointment.time}
                    active={row.d2[col].active} 
                    onClick={() => handleAppointment(row.d0[col].time, weekdays[2][0], weekdays[2][2])}
                  >
                    <CellTime>{row.d2[col].time}</CellTime>
                    {pathname === '/management/appointment' &&
                      <CellAvailable>{row.d2[col].available}</CellAvailable>
                    }
                  </CellButton>
                }
              </Cell>
              <Cell align="center">
                {!['Sáb','Dom'].includes(weekdays[3][0]) &&
                  <CellButton 
                    selected={weekdays[3][2] === appointment.date && row.d3[col].time === appointment.time}
                    active={row.d3[col].active} 
                    onClick={() => handleAppointment(row.d0[col].time, weekdays[3][0], weekdays[3][2])}
                  >
                    <CellTime>{row.d3[col].time}</CellTime>
                    {pathname === '/management/appointment' &&
                      <CellAvailable>{row.d3[col].available}</CellAvailable>
                    }
                  </CellButton>
                }
              </Cell>
              <Cell align="center">
                {!['Sáb','Dom'].includes(weekdays[4][0]) &&
                  <CellButton 
                    selected={weekdays[4][2] === appointment.date && row.d4[col].time === appointment.time}
                    active={row.d4[col].active} 
                    onClick={() => handleAppointment(row.d0[col].time, weekdays[4][0], weekdays[4][2])}
                  >
                    <CellTime>{row.d4[col].time}</CellTime>
                    {pathname === '/management/appointment' &&
                      <CellAvailable>{row.d4[col].available}</CellAvailable>
                    }
                  </CellButton>
                }
              </Cell>
              <Cell align="center">
                {!['Sáb','Dom'].includes(weekdays[5][0]) &&
                  <CellButton 
                    selected={weekdays[5][2] === appointment.date && row.d5[col].time === appointment.time}
                    active={row.d5[col].active} 
                    onClick={() => handleAppointment(row.d0[col].time, weekdays[5][0], weekdays[5][2])}
                  >
                    <CellTime>{row.d5[col].time}</CellTime>
                    {pathname === '/management/appointment' &&
                      <CellAvailable>{row.d5[col].available}</CellAvailable>
                    }
                  </CellButton>
                }
              </Cell>
              <Cell align="center">
                {!['Sáb','Dom'].includes(weekdays[6][0]) &&
                  <CellButton 
                    selected={weekdays[6][2] === appointment.date && row.d6[col].time === appointment.time}
                    active={row.d6[col].active} 
                    onClick={() => handleAppointment(row.d0[col].time, weekdays[6][0], weekdays[6][2])}
                  >
                    <CellTime>{row.d6[col].time}</CellTime>
                    {pathname === '/management/appointment' &&
                      <CellAvailable>{row.d6[col].available}</CellAvailable>
                    }
                  </CellButton>
                }
              </Cell>
            </TableRow>
          )
        })
      ))
    }
  }

  const validate = () => {
    if(appointment.date !== ""){
      return true
    } else {
      return false
    }
  }

  const validateQueue = (date) => {
    if(window.confirm('Você tem certeza que deseja entrar para a fila de espera?')){
      let current_date = new Date()
      let aux = formatDate(current_date)

      if (date !== "hoje") {
        current_date.setDate(current_date.getDate() + 1)
        aux = formatDate(current_date)
      }

      setAppointment({
        date: aux[1],
        weekday: aux[0],
        time: '',
        queue: true
      })
    }
  }

  const queue = () => {
    if(formatDate(today)[1] === formatDate(dateSelected)[1]){
      if(schedules.schedule.length > 0){
        let data = schedules.schedule[0] 
        return (
          <Queue>
            <QueueCard>
              <div><h2>Fila de espera - Hoje</h2></div>
              <QueueCardContent>
                <QueueCardText>{data.d0[0].queue}</QueueCardText>
                <Button 
                  label={"Entrar na fila"}
                  variant={"contained"}
                  onClick={() => validateQueue("hoje")}
                />
              </QueueCardContent>
            </QueueCard>
            <QueueCard>
              <div><h2>Fila de espera - Amanhã</h2></div>
              <QueueCardContent>
                <QueueCardText>{data.d1[0].queue}</QueueCardText>
                <Button 
                  label={"Entrar na fila"}
                  variant={"contained"}
                  onClick={() => validateQueue("amanhã")}
                />
              </QueueCardContent>
            </QueueCard>
          </Queue>
        )
      }
    }
  }

  return (
    <>
      <Container>
        <Title label={"Agenda: "+props.data.clinic+" - "+props.data.specialty+"."}/>
        <Content>
          {clinic === "Odontologia" && queue()}
          <div>
            <Filters>
              <InputDate
                name={"date"}
                label={"Data"}
                width={"auto"}
                value={dateSelected}
                onChange={(e) => handleDate(e)}
              />
              <Button 
                label={">"}
                variant={"contained"}
                onClick={() => handleNextWeek()}
              />
            </Filters>
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    {weekdays.map(str => (
                      <Cell align='center'>
                        <DaysWeek>{str[0]}</DaysWeek><br/>
                        <DaysMonth>{str[1]}</DaysMonth>
                      </Cell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {schedules.schedule.length > 0 && datediff(today, dateSelected) >= 0 && handleScheduler().map(item => item)}
                </TableBody>
              </Table>
            </Paper>
          </div>
        </Content>
      </Container>
      <Controller {...props} data={{appointment: appointment, check: validate()}}/>
    </>
  )
}
export default Step5;