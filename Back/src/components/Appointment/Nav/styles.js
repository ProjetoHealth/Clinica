import styled from 'styled-components';

import StepperMUI from '@material-ui/core/Stepper';

export const Stepper = styled(StepperMUI)`
  &.MuiPaper-root{
    background-color: transparent;
  }
  .MuiStepIcon-root.MuiStepIcon-completed{
    color: #43b53f;
  }
`