import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import {ReactNotifications} from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import Sidebar from '../../components/Sidebar';
import Classes from './Classes';
import ClassAdd from './Classes/Add';
import Team from './Team';
import Home from './Home';
import Appointment from '../../components/Appointment';

import {
  Container,
  Content
} from './styles';

function Login(){
  
  const {pathname} = useLocation();

  return(
    <>
      <ReactNotifications/> 
      <Container>
        <Sidebar/>
        <Content isAppointment={pathname === '/management/appointment'}>
          <Switch>
            <Route exact path="/management" component={Home}/>
            <Route exact path="/management/team" component={Team}/>
            <Route exact path="/management/classes" component={Classes}/>
            <Route path="/management/classes/add" component={ClassAdd}/>
            <Route path="/management/appointment" component={Appointment}/>
          </Switch>
        </Content>
      </Container>
    </>
  )
}
export default Login;