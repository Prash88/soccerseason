/**
 * Copyright 2017-present FireAnt. All Rights Reserved.
 *
 * @providesModule LeagueDetails
 * @flow
 * @format
*/

import React, { Component } from 'react';
import '../css/League.css';
import idx from 'idx';
import axios from 'axios';

type State = {
	data: Object
};

type Props = {
	location: any,
	match: any
};

class LeagueDetails extends Component<Props, State> {
	state: State;
	props: Props;
	constructor(props: Props) {
		super(props);
		this.state = {
			data: idx(this.props, _ => _.location.state.data) || {}
		};
	}

	componentWillMount() {
		if (Object.getOwnPropertyNames(this.state.data).length === 0) {
			const config = {
				headers: {
					'X-Auth-Token': 'eba8eb46e6ab4af3914fd93b4eeedb0f'
				}
			};
			axios
				.get(
					'https://api.football-data.org/v1/soccerseasons/' +
						parseInt(this.props.match.params.id, 10),
					config
				)
				.then(response => {
					this.setState({ data: response.data });
				})
				.catch(error => {
					console.log(error);
				});
		}
	}

	render() {
		if (Object.getOwnPropertyNames(this.state.data).length === 0) {
			return <div />;
		}
		return (
			<div>
				<h2 className="leagueHeaderText">
					{idx(this.state.data, _ => _.caption) || ''}
				</h2>
				<p className="leagueText">
					NumberOfMatchdays :{' '}
					{idx(this.state.data, _ => _.numberOfMatchdays) || 0}
				</p>
				<p className="leagueText">
					CurrentMatchday : {idx(this.state.data, _ => _.currentMatchday) || 0}
				</p>
				<p className="leagueText">
					NumberOfTeams : {idx(this.state.data, _ => _.numberOfTeams) || 0}
				</p>
				<p className="leagueText">
					NumberOfGames : {idx(this.state.data, _ => _.numberOfGames) || 0}
				</p>
			</div>
		);
	}
}

export default LeagueDetails;
