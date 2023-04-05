import React from 'react';
import Button from '../Input/Button';

import {
  Container,
  Content,
  Description
} from './styles';

function Banner(){
  return(
    <>
      <Container>
        <Content>
          <Description>
            <h1>GENT</h1>
            <p>No setor de saúde, a excelência em serviços é a facilidade do hospital como provedor de serviços de saúde de forma consistente.</p><br/>
            <Button
              label={"Blog da ASSOPOC"}
              variant={"contained"}
              link={"https://blog.assopoc.org.br"}
            />
          </Description>
        </Content>
      </Container>
    </>
  )
}
export default Banner;
