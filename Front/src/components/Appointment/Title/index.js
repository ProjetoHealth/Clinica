import React from 'react';

import {
  ContentTitle
} from '../styles';

function Title({
  label
}){
  return (
    <>
      <ContentTitle>
        <h1>{label}</h1>
      </ContentTitle>
    </>
  );
}
export default Title;