import React from 'react';
import { BrowserRouter, Route, HashRouter, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Appointments from './pages/Appointments';
import Login from './pages/Login';
import Management from './pages/Management';

function Routes() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <HashRouter>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/appointments" component={Appointments}/>
            <Route path="/login" component={Login}/>
            <Route path="/management" component={Management}/>
          </Switch>
      </HashRouter>
    </BrowserRouter>
  );
}
export default Routes;