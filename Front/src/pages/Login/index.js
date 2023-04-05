import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import { ReactNotifications, Store}  from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

import Logo from "../../assets/img/logo-preto.png";
import InputText from '../../components/Input/Text';
import Button from '../../components/Input/Button';

import {
  Container,
  Content,
  LogoStyled,
  BannerLogin,
  Forms,
  ContentForms
} from './styles';


function Login(){
  const history = useHistory(); 
  const [forms, setForms] = useState({
    email: '',
    pwsd: ''
  })
  
  const handleSubmit = async() => {
    try {
      await api.post('/login',forms).then((response) => {
        const data = response.data
        
        if(response.data.response){
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
          history.push('/management')
        } else {
          Store.addNotification({
            title: 'Falha ao Efetuar o Login.',
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
        console.log(response.data)
      })
    } catch(error) {
      console.log(error)
    }
  }

  const handleForms = (e) => {
    setForms({...forms, [e.target.name]: e.target.value})
  }

  return(
    <>
      <ReactNotifications/>
      <Container>
        <Content>
          <LogoStyled src={Logo} alt="" width = "500px"/>
          <ContentForms>
            <Forms>
              <h1>Login </h1> 
              <div>
                <InputText
                  fullWidth
                  name={"email"}
                  label={"E-mail"}
                  variant={"outlined"}
                  type={"email"}
                  onChange={(e) => handleForms(e)}
                />
                <InputText
                  fullWidth
                  name={"pwsd"}
                  label={"Senha"}
                  variant={"outlined"}
                  type={"password"}
                  onChange={(e) => handleForms(e)}
                />
              </div>
              <Button 
                label={"Acessar"}
                variant={"contained"}
                onClick={handleSubmit}
              /> 
            </Forms>
          </ContentForms>
        </Content>
        <BannerLogin/>
      </Container>
    </>      
  )
}
export default Login;