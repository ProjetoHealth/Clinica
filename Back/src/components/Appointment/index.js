import React, { useState } from 'react';
import Button from '../Input/Button';
import 'react-notifications-component/dist/theme.css';
import { ReactNotifications,Store } from 'react-notifications-component';
import api from '../../services/api';
import jwt from "jwt-decode";

import Nav from './Nav';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
import Step4 from './Steps/Step4';
import Step5 from './Steps/Step5';
import Step6 from './Steps/Step6';
import Fineshed from './Steps/Finished';

import {
  Container,
  Paper,
  ContentButton,
  ButtonMUI,
  ContentStep
} from './styles';

function getStepsName() {
   return [
    'Dados Básicos',
    'Clínicas',
    'Especialidades',
    'Dados do Paciente',
    'Agendamento',
    'Termo de Aceite',
    'Concluído'
   ]
}

function Steper() {
  console.log('Steper');
  const stepsName = getStepsName();
  const [activeStep, setActiveStep] = useState(0); 
  const [forms, setForms] = useState({
    clinic: '',
    specialty: '',
    patient: {
      name: '',
      surname: '',
      gender: '',
      birthday: new Date(),
      identity: '',
      email: '',
      tell: '',
      cep: '',
      address: '',
      number: '',
      district: '',
      city: '',
      state: '',
    },
    appointment: {
      dete: '',
      weekday: '',
      time: '',
      queue: '',
    }
  })

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleForms = (data) => {
    setForms({...forms, ...data})
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Step1 step={step} nextStep={handleNext} prevStep={handleBack} totalSteps={stepsName.length} setForm={handleForms}/>;
      case 1:
        return <Step2 step={step} nextStep={handleNext} prevStep={handleBack} totalSteps={stepsName.length} data={forms.clinic} setForm={handleForms}/>;
      case 2:
        return <Step3 step={step} nextStep={handleNext} prevStep={handleBack} totalSteps={stepsName.length} data={forms} setForm={handleForms}/>;
      case 3:
        return <Step4 step={step} nextStep={handleNext} prevStep={handleBack} totalSteps={stepsName.length} data={forms.patient} setForm={handleForms} />;
      case 4:
        return <Step5 step={step} nextStep={handleNext} prevStep={handleBack} totalSteps={stepsName.length} data={forms} setForm={handleForms}/>;
      case 5:
        return <Step6 step={step} nextStep={handleNext} prevStep={handleBack} totalSteps={stepsName.length} data={forms}/>;
      case 6:
        return <Fineshed data={forms} />;
      default:
        return 'Unknown step';
    }
  }

  return (
    <Container>
      <div>
      <ReactNotifications/>
      <Nav activeStep={activeStep} steps={stepsName}/>
      <Paper>
        <ContentStep>
          {getStepContent(activeStep)}
        </ContentStep>
      </Paper>
      </div>

    </Container>
  );
}
export default Steper;

export const Controller = ({
  setForm,
  nextStep,
  prevStep,
  totalSteps,
  patient, 
  step,
  data,
  forms
}) => {

  const handleBack = () => {
    prevStep(step)
  }

  const getPatient = async() => {
    if(patient !== ''){
      try {
        await api.get('appointments/patient', {
          params: {
            patient: patient
          }
        }).then((response) => {
          const data = response.data
          if(data.result) {
            const patient = {patient: jwt(data.patient)}
            setForm(patient)
            Store.addNotification({
              title: 'Sucesso',
              message: data.message,
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
            nextStep(step)
          } else {
            Store.addNotification({
              title: 'Erro',
              message: data.message,
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
    } else {
      nextStep(step)
    }
  }

  const handleNext = () => {
    if(data.check){
      if(step === 0){
        getPatient(step)
      }else if(step !== 5) {
        nextStep(step)
      } else if (data.submit) {
        handleSubmit()
      }

      if(setForm){
        delete data.check
        setForm(data)
      } 

    } else {
      Store.addNotification({
        title: 'Erro',
        message: 'Selecione ao menos uma opção',
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

  const handleSubmit = async() => {
    const data = forms;
    try {
      await api.post('/appointments/add',data).then((response) => {
        console.log(response.data)
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
          nextStep(step)
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
    } catch(error) {
      console.log(error)
    }
  }
  
  return (
    <>
      { step < 6 && 
        <ContentButton isFirstStep={step === 0}>
          {step > 0 &&
            <ButtonMUI disabled={step === 0} onClick={handleBack} >Voltar</ButtonMUI>
          }
          <Button 
            label={step === totalSteps - 2 ? 'Concluir Agendamento' : 'Próximo'}
            variant={"contained"}
            onClick={handleNext}
          />
        </ContentButton>
      }
    </>
  );
} 