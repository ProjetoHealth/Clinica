import React from 'react';

import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import {
  Stepper
} from './styles';

function Nav({
  activeStep,
  steps
}) {

  return (
    <>
      <Stepper activeStep={activeStep}>
        {steps.filter((item) => item !== "Concluído").map((label) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </>
  )
}
export default Nav;