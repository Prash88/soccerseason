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
	details: Object,
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
			data: {}
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
				'https://sportsop-soccer-sports-open-data-v1.p.mashape.com/v1/leagues/' +
					this.props.match.params.id +
					'/seasons/17-18/standings',
				config
			)
			.then(response => {
				const data = idx(response, _ => _.data.data.standings) || [];
				this.setState({ data });
			})
			.catch(error => {
				console.log(error);
			});
	}

	render() {
		const name = idx(this.props, _ => _.location.state.details.name);
		return (
			<div>
				<h2 className="leagueHeaderText">
					{name}
				</h2>
			</div>
		);
	}
}

export default LeagueDetails;
