/**
 * Copyright 2017-present FireAnt. All Rights Reserved.
 *
 * @providesModule Home
 * @flow
 * @format
*/

import React, { Component } from 'react';
import League from './League';
import axios from 'axios';
import idx from 'idx';

type State = {
	data: Array<Object>
};

type Props = {};

class Home extends Component<Props, State> {
	state: State;
	props: Props;

	constructor(props: Props) {
		super(props);
		this.state = {
			data: []
		};
	}
	componentWillMount() {
		const config = {
			headers: { 'X-Auth-Token': 'eba8eb46e6ab4af3914fd93b4eeedb0f' }
		};
		axios
			.get('https://api.football-data.org/v1/soccerseasons', config)
			.then(response => {
				this.setState({ data: idx(response, _ => _.data) || [] });
			})
			.catch(error => {
				console.log(error);
			});
	}

	render() {
		return (
			<div className="app">
				<div className="container">
					{this.state.data.map(league => {
						return <League key={idx(league, _ => _.id) || 0} data={league} />;
					})}
				</div>
			</div>
		);
	}
}

export default Home;
