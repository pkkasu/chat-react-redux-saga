import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import Chat from '../Chat';
import Admin from '../Admin';
import UserEditor from '../UserEditor';
import Login from '../Login';
import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';
import EditMessage from '../EditMessage';

const Routing = () => {
  return (
    <Switch>
      <PublicRoute exact path="/login" component={Login} />
      <PrivateRoute exact path="/list" component={Admin} />
      <PrivateRoute exact path="/editor/:id" component={UserEditor} />
      <PrivateRoute exact path="/chat" component={Chat}/>
      <PrivateRoute exact path="/message/:id" component={EditMessage} />
      <Redirect to="/login" />
    </Switch>
  );
}

export default Routing;