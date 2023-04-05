import React from 'react';
import Navigator from '../../components/Navigator';
import Steper from '../../components/Appointment/index';

import {
  Container
} from './styles';

function Appointments(){
  return(
    <>
      <Navigator />
      <Container>
        <Steper />
      </Container>
    </>
  )
}
export default Appointments;
