import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from './assets/globalStyles';
import Routes from './routes';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);