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
import LeagueDetails from './LeagueDetails';
import NotFound from './NotFound';
import idx from 'idx';

const PUBLIC_URL = idx(process, _ => _.env.PUBLIC_URL) || '';

const Routes = (): React$Element<any> =>
	<Switch>
		<Route exact path={PUBLIC_URL + '/'} component={Home} />
		<Route exact path={PUBLIC_URL + '/soccerseason/'} component={Home} />
		<Route
			exact
			path={PUBLIC_URL + '/soccerseason/details/:id'}
			component={LeagueDetails}
		/>
		<Route exact path="/soccerseason/404" component={NotFound} />
		<Redirect to="/soccerseason/404" push />
	</Switch>;

export default withRouter(Routes);
