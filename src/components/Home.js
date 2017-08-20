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
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';

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

const styles = {
	appHeader: {
		padding: '20px'
	},
	appHeaderText: {
		padding: '20px'
	}
};

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
			<div>
				<div style={styles.appHeader}>
					<AppBar position="static" color="primary">
						<Typography
							style={styles.appHeaderText}
							type="title"
							color="inherit"
							align="center"
						>
							Soccer Leagues
						</Typography>
					</AppBar>
				</div>
				<div>
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

export default withStyles(styles)(Home);
