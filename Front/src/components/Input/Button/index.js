import React from 'react';
import { useLocation } from 'react-router-dom';

import {
  Button
} from './styles';

function ContainedButtons({
  label,
  variant,
  backgroundColor,
  fullWidth,
  link,
  onClick
}) {

  const {pathname} = useLocation();
  
  const relaodPage = () => {
    window.location.reload();
  }

  return (
    <Button 
      fullWidth={fullWidth}
      variant={variant}
      backgroundColor={backgroundColor != null ? backgroundColor : '#fff'}
      href={link === pathname ? relaodPage() : link}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
export default ContainedButtons;