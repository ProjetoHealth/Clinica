import React, { useState, useEffect } from 'react';
import InputSelect from '../../Input/Select';
import Button from '../../Input/Button';
import api from '../../../services/api';

import {
  Container,
  InputGroup,
  ContentButton
} from './styles';

function Filter({
  onChange,
  clinic,
  specialties,
  teacher,
  year,
  semester,
  onFilter
}){

  const [filters, setFilters] = useState({
    clinic: ['Medicina','Odontologia','Fisioterapia','Nutrição','Psicologia'],
    teacher: [],
    specialties: [],
    reload: true
  })
  const [forms, setForms] = useState({
    clinic: [],
    specialties: [],
    teacher: [],
    year: [],
    semester: '',
  })
  
  useEffect(() => {
    const getClasses = async() => {
      if(filters.reload){
        try {
          api.get('filters').then((response) => {
            setFilters({
              ...filters,
              teacher: response.data.teacher,
              specialties: response.data.specialties,
              reload: false,
            })
          })
        } catch (error) {
          console.log(error)
        }
      }
    }
    getClasses()
  });

  const handleSpecialtiesOptions = () => {
    let clinic_id = clinic.map(item => filters.clinic.indexOf(item) + 1);
    return filters.specialties.filter((item) => clinic_id.includes(item.clinic)).map((item) => item.name)
  }

  const handleTeacherOptions = () => {
    let clinic_id = clinic.map(item => filters.clinic.indexOf(item) + 1);
    return filters.teacher.filter((item) => clinic_id.includes(item.clinic)).map((item) => item.name)
  }

  const handleForms = (e) => {
    setForms({
      ...forms,
      [e.target.name]:e.target.value
    })
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

  return(
    <>
      <Container>
        <h2>Filtros</h2>
        <InputGroup>
          <InputSelect 
            multiple
            name={"clinic"}
            label={"Clínicas"}
            value={clinic}
            option={filters.clinic}
            onChange={onChange}
          />
          <InputSelect 
            multiple
            name={"specialties"}
            label={"Especialidade"}
            value={specialties}
            option={handleSpecialtiesOptions()}
            onChange={onChange}
          />
          <InputSelect 
            multiple
            name={"teacher"}
            label={"Professor(a)"}
            value={teacher}
            option={handleTeacherOptions()}
            onChange={onChange}
          />
          <InputSelect 
            multiple
            name={"year"}
            label={"Ano"}
            value={year}
            option={handleYearsOptions(3)}
            onChange={onChange}
          />
          <InputSelect 
            multiple
            name={"semester"}
            label={"Semestre"}
            value={semester}
            option={['1° Semestre','2° Semestre']}
            onChange={onChange}
          />
        </InputGroup>
        <ContentButton>
          <Button
            label={"Aplicar Filtro"}
            variant={"contained"}
            onClick={onFilter}
          />
        </ContentButton>
      </Container>
    </>
  )
}
export default Filter;