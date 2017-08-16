/**
 * Copyright 2017-present FireAnt. All Rights Reserved.
 *
 * @providesModule League
 * @flow
 * @format
*/

import React from 'react';
import '../css/League.css';
import idx from 'idx';
import { withRouter } from 'react-router-dom';

type LeagueProps = {
	data: Object,
	history: Object
};

class League extends React.Component {
	props: LeagueProps;
	render() {
		return (
			<div
				className="column"
				onClick={() =>
					this.props.history.push('/details/' + this.props.data.id, {
						data: this.props.data
					})}
			>
				<div className="league">
					<h2 className="leagueHeaderText">
						{idx(this.props.data, _ => _.caption) || ''}
					</h2>
				</div>
			</div>
		);
	}
}

export default withRouter(League);
