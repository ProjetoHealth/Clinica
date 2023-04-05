import React from 'react';
import LocalIcon from '../../assets/img/local.png';
import PhoneIcon from '../../assets/img/phone.png';
import Card from './Card';
import Mounting from '../../assets/img/Montagem.png';
import {
  Container,
} from './styles';

function Footer(){
  return(
    <>
      <Container>
        <Card
          img={LocalIcon}
          title={"Onde Estamos"}
          desc={"SEDE EM CRUCILÂNDIA Rua São Vicente de Paula, 175 Vicentino - Crucilândia/MG"}
        />
        <Card 
          img={LocalIcon}
          title={"Também Estamos"}
          desc={"ESCRITÓRIO EM BELO HORIZONTE Rua Engenheiro Ocelo Cirino, 55 Estoril - Belo Horizonte/MG."}
        />
        <Card 
          img={PhoneIcon}
          title={"Nosso Contatos"}
          desc={"E-mail: contato@assopoc.org.brCelular: (31) 98853-0144 Telefone: (31) 3378-2107"}
        />       
        <Card 
          img={Mounting}
        />  
      </Container>
    </>
  )
}
export default Footer;