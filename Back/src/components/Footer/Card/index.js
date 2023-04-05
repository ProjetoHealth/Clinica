import React from 'react';
import Button from '../../Input/Button';

import {
  Card
} from './styles';

function Cards({
  img,
  title,
  desc,
  button
}){
  return(
    <>
      <Card>
        <img src={img} alt=""/> 
        <h2>{title}</h2>
        <p>{desc}</p>
        { button &&
          <Button
            label={"Agende uma Consulta"}
            variant={"outlined"}
            link={"#appointments"}
          />
        }
      </Card>
    </>
  )
}
export default Cards;