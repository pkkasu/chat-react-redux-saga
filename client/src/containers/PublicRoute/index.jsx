import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ component: Component, isAuthorized, ...rest }) => {
  const { isAuth } = useSelector(state => state.currentUser)
  return (<Route
    {...rest}
    render={props => (isAuth
      ? <Redirect to={{ pathname: '/list', state: { from: props.location } }} />
      : <Component {...props} />)}
  />)
};

export default PublicRoute;
