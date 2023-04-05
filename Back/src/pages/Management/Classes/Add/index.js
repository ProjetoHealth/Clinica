import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import InputText from '../../../../components/Input/Text';
import InputSelect from '../../../../components/Input/Select';
import InputCheckBox from '../../../../components/Input/CheckBox';
import InputTransfer from '../../../../components/Input/Transfer';
import Button from '../../../../components/Input/Button';
import api from '../../../../services/api';
import { Store } from 'react-notifications-component';

import {
  Content,
  InputGroup,
  Times
} from './styles';

function Team(){
  const history = useHistory(); 
  const [filters, setFilters] = useState({
    clinic: ['Medicina','Odontologia','Fisioterapia','Nutrição','Psicologia'],
    teacher: [],
    specialties: [],
    reload: true
  })
  const [forms, setForms] = useState({
    name: '',
    clinic: '',
    specialties: '',
    teacher: '',
    year: '',
    semester: '',
    appointments_day: '',
    times: {},
    queue: false
  })

  useEffect(() => {
    const getSpecialties = async() => {
      if(filters.reload) {
        try{
          api.get('/turmas/filters').then((response) => {
            setFilters({
              ...filters,
              specialties: response.data.specialties,
              teacher: response.data.teacher,
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

  const handleForms = (e) => {
    if(e.target.name === 'queue') {
      setForms({ ...forms, [e.target.name]: e.target.checked })
    } else {
      setForms({ ...forms, [e.target.name]:e.target.value })
    }
  } 

  const handleSpecialtiesOptions = (clinic) => {
    let clinic_id = filters.clinic.indexOf(clinic) + 1;
    return filters.specialties.filter((item) => item.clinic === clinic_id).map((item) => item.name)
  }

  const handleTeacherOptions = (clinic) => {
    let clinic_id = filters.clinic.indexOf(clinic) + 1;
    return filters.teacher.filter((item) => item.clinic === clinic_id).map((item) => item.name)
  }

  const handleYearsOptions = (i) => {
    let currentYear = new Date().getFullYear()
    let years = []
    let index = 0

    while (index < i){
      years.push(currentYear++)
      index++
    }
    return years
  }

  const handleSelected = (data, type) => {
    if (type === 'selected') {
      setForms({ ...forms, times: { ...forms.times, [data.weekday]: data }})
    } else {
      setForms({ ...forms, times: data})
    }
  }

  const handleSubmit = async() => {
    try {
      await api.post('turmas/add', forms).then((response) => {
        if(response.data.response){
          Store.addNotification({
            title: 'Sucesso',
            message: response.data.menssage,
            type: 'success',
            insert: 'top',
            container: 'top-right',
            animationIn: ['animated', 'fadeIn'],
            animationOut: ['animated', 'fadeOut'],
            dismiss: {
              duration: 5000,
              onScreen: true,
            },
          });
          history.push('/management/classes')
        } else {
          Store.addNotification({
            title: 'Erro',
            message: response.data.menssage,
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

  const validateForms = () => {
    let validate = Object.keys(forms).filter((key) => forms[key] === '')

    if(validate.length === 0){
      handleSubmit()
    } else {
      Store.addNotification({
        title: 'Formulário Incompleto',
        message: 'Existem campos não preenchidos.',
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
  }

  return(
    <>
      <div>
        <Content>
          <h3>Dados Básicos</h3>
          <div>
            <InputGroup>
              <InputText
                fullWidth
                name={'name'}
                label={'Nome da Turma'}
                variant={'outlined'}
                onChange={(e) => handleForms(e)}
              />
            </InputGroup>
            <InputGroup>
              <InputSelect 
                name={"clinic"}
                label={"Clínicas"}
                value={forms.clinic}
                option={filters.clinic}
                onChange={(e) => handleForms(e)}
              />
              <InputSelect 
                name={"specialties"}
                label={"Especialidade"}
                value={forms.specialties}
                option={handleSpecialtiesOptions(forms.clinic)}
                onChange={(e) => handleForms(e)}
              />
              <InputSelect 
                name={"teacher"}
                label={"Professor"}
                value={forms.teacher}
                option={handleTeacherOptions(forms.clinic)}
                onChange={(e) => handleForms(e)}
              />
            </InputGroup>
            <InputGroup>
              <InputSelect 
                name={"year"}
                label={"Ano"}
                value={forms.year}
                option={handleYearsOptions(3)}
                onChange={(e) => handleForms(e)}
              />
              <InputSelect 
                name={"semester"}
                label={"Semestre"}
                value={forms.semester}
                option={['1° Semestre', '2° Semestre']}
                onChange={(e) => handleForms(e)}
              />
            </InputGroup>
            <InputGroup>
              <InputText 
                type={'number'}
                name={'appointments_day'}
                label={'N° Consultas/dia'}
                variant={'outlined'}
                onChange={(e) => handleForms(e)}
              />
              <InputCheckBox 
                name={'queue'}
                value={forms.queue}
                label={'Haverá fila de espera?'}
                onChange={(e) => handleForms(e)}
              />
            </InputGroup>
          </div>
        </Content>
        <Content>
          <h3>Horários das Aulas</h3>
          <Times> 
            <InputTransfer
              name={'times'}
              getData={handleSelected}
            />
            <Button 
              label={"Cadastrar Turma"}
              variant={"contained"}
              onClick={validateForms}
            /> 
          </Times>
        </Content>
      </div>
    </>
  )
}
export default Team;