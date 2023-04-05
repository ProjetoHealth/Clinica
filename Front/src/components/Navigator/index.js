import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/logo-preto.png';
import Button from '../Input/Button';

import {
  Container,
  Menu,
  ListLinks,
  ButtonDiv
} from './styles';

function Navigator(){
  return(
    <>
      <Container>
        <Link to="/"><img src={Logo} width="200px" height="42px" alt=""/></Link>
        <Menu>
          <ListLinks>
            <li><Link to="/">Home</Link></li>
            <li>Contatos</li>
            <li>Trabalhe Conosco</li>
          </ListLinks>
          <ButtonDiv>
            <Button
              label={"Login"}
              variant={"contained"}
              link={"#login"}
            />
          </ButtonDiv>
        </Menu>
      </Container>
    </>
  )
}
export default Navigator;