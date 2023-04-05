import React from 'react';
import { Link } from 'react-router-dom';
import {Group, Class, Event} from '@material-ui/icons';
import LogoImg from '../../assets/img/logo-branco.png';

import {
  Container,
  Logo,
  User,
  HorizontalLine,
  Links
} from './styles';

function Sidebar(){
  return(
    <>
      <Container>
        <Logo>
          <Link to="/management"><img src={LogoImg} alt="" width="250px"/></Link>
        </Logo>
        <User>
          <h2>Nome de Usuário</h2>
          <HorizontalLine/>
          <span>Administrador</span>
        </User>
        <Links>
          <ul>
            <Link to="/management/team"><li><Group fontSize="large"/> Colaboradores</li></Link>
            <Link to="/management/classes"><li><Class fontSize="large"/> Turmas</li></Link>
            <Link to="/management/appointment"><li><Event fontSize="large"/> Agendar Consultas</li></Link>
          </ul>
        </Links>
      </Container>
    </>
  )
}
export default Sidebar;