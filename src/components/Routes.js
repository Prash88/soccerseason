// @flow
import React, { Component } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import NotFound from './NotFound';

const Routes = (): React.Element<*> =>
  <Switch>
    <Route
      exact
      path={process.env.PUBLIC_URL + '/'}
      render={defaultProps => <Home {...defaultProps} />}
    />
    <Route exact path="/404" component={NotFound} />
    <Redirect to="/404" push />
  </Switch>;

export default withRouter(Routes);
