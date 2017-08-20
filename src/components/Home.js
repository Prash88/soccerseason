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

const leagueFilter = [
	'bundesliga',
	'eredivisie',
	'liga',
	'ligue1',
	'premier-league',
	'serie-a'
];

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
			headers: {
				'X-Mashape-Key': 'feOdU1oCCMmshGf0mInizsHcrvNpp1uQyAAjsnnlfdvUNFrga7',
				Accept: 'application/json'
			}
		};
		axios
			.get(
				'https://sportsop-soccer-sports-open-data-v1.p.mashape.com/v1/leagues',
				config
			)
			.then(response => {
				let data = idx(response, _ => _.data.data.leagues) || [];
				data = data.filter(league => leagueFilter.includes(league.league_slug));
				this.setState({ data });
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
						return (
							<League key={idx(league, _ => _.identifier) || 0} data={league} />
						);
					})}
				</div>
			</div>
		);
	}
}

export default Home;
