import React, { useState } from 'react';

import InputSelect from '../../Input/Select';
import InputTime from '../../Input/Time';
import InputCheckBox from '../../Input/CheckBox';
import Button from '../../Input/Button';

import {
  Container,
  Content,
  Times,
  InputGroup
} from './styles';

export default function TransferList({
  name,
  getData
}) {

  const [selected, setSelected] = useState({});
  const [checked, setChecked] = useState([]);
  const [forms, setForms] = useState({
    weekday: '',
    start: '07:00',
    end: '07:00'
  });

  const handleForms = (e) => {
    setForms({ ...forms, [e.target.name]: e.target.value })
  };
  const handleSelected = () => {
    if(forms.weekday !== '' && forms.start !== '' && forms.end !== ''){
      getData({weekday: forms.weekday, start: forms.start, end: forms.end}, 'selected')
      setSelected({
        ...selected,
        [forms.weekday]: {key: forms.weekday, start: forms.start, end: forms.end}
      })
    }
  };
  const handleChecked = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const handleUnselected = () => {
    let notChecked = Object.keys(selected).filter((item) => checked.indexOf(item) === -1)
    let newSelected = {}

    Object.entries(selected).filter(([key, item]) => notChecked.includes(key)).map(([key, item]) => { return newSelected[key] = item })
    
    getData(newSelected)
    setSelected(newSelected)
    setChecked([])
  };
  const selectedList = () => (
    <>
      <Times>
        {Object.keys(selected).map((key) => {
          return (
              <InputCheckBox 
                name={key}
                value={checked[key]}
                label={key + ' de ' + selected[key].start + ' à ' + selected[key].end}
                onChange={() => handleChecked(key)}
              />
            );
        })}
      </Times>
      <Button 
        fullWidth
        label={"Remover"}
        variant={"contained"}
        onClick={handleUnselected}
      /> 
    </>
  );
  
  return (
    <Container>
      <Content elevation={3}>
        <Times>
          <InputSelect 
            name={"weekday"}
            label={"Dia da Semana"}
            value={forms.weekday}
            option={['Seg','Ter','Qua','Qui','Sex']}
            onChange={(e) => handleForms(e)}
          />
          <InputGroup>
            <InputTime
              name={'start'}
              label={"Ínicio"}
              variant={'outlined'}
              onChange={(e) => handleForms(e,'start')}
            />
            <InputTime
              name={'end'}
              label={"Fim"}
              variant={'outlined'}
              onChange={(e) => handleForms(e,'end')}
            />
          </InputGroup>
        </Times>
        <Button 
          fullWidth
          label={"Adicionar"}
          variant={"contained"}
          onClick={handleSelected}
        />
      </Content>
      <Content elevation={3}>{selectedList()}</Content>
    </Container>
  );
}
