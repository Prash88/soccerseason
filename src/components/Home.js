/**
 * Copyright 2017-present FireAnt. All Rights Reserved.
 *
 * @providesModule Home
 * @flow
 * @format
*/

import React from 'react';
import League from './League';

const Home = (): React.Element<*> =>
	<div className="app">
		<div className="container">
			<League />
			<League />
			<League />
			<League />
			<League />
			<League />
		</div>
	</div>;

export default Home;
