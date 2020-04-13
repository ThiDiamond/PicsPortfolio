import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Admin from './pages/admin';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" render={props => <Home />} />

      <Route path="/login" render={props => <Login />} />
      <Route path="/admin" render={props => <Admin />} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
