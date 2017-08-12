/**
 * Copyright 2017-present FireAnt. All Rights Reserved.
 *
 * @providesModule Routes
 * @flow
 * @format
*/

import React from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import NotFound from './NotFound';
import idx from 'idx';

const PUBLIC_URL = idx(process, _ => _.env.PUBLIC_URL) || '';

const Routes = (): React.Element<*> =>
  <Switch>
    <Route
      exact
      path={PUBLIC_URL + '/'}
      render={defaultProps => <Home {...defaultProps} />}
    />
    <Route exact path="/404" component={NotFound} />
    <Redirect to="/404" push />
  </Switch>;

export default withRouter(Routes);
