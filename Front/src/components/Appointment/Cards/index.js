import React from 'react';

import {
  Container,
  Content
} from './styles';

function Cards({
  name,
  icon,
  clinic,
  label,
  desc,
  onClick,
  active,
  type
}) {

  const isActive = name === active;

  return (
    <Container onClick={onClick} name={name} active={isActive} type={type}>
      <Content type={type}>
        {icon &&
          <div><img src={icon} alt=""/></div>
        }
        {clinic &&
          <span>{clinic}</span>
        }
        <h2>{label}</h2>
        {desc && 
          <p>{desc}</p>
        }
      </Content>
    </Container>
  );
}
export default Cards;