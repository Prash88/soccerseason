/**
 * Copyright 2017-present FireAnt. All Rights Reserved.
 *
 * @providesModule League
 * @flow
 * @format
*/

import React from 'react';
import idx from 'idx';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';

type LeagueProps = {
	data: Object,
	history: Object
};

const styles = {
	card: {
		padding: '20px'
	},
	cardContent: {
		padding: '20px'
	}
};

class League extends React.Component<LeagueProps> {
	props: LeagueProps;
	render() {
		console.log(this.props.data);
		return (
			<div
				style={styles.card}
				onClick={() =>
					this.props.history.push(
						'/soccerseason/details/' + this.props.data.league_slug,
						{
							details: this.props.data
						}
					)}
			>
				<AppBar position="static" color="inherit">
					<Typography
						style={styles.cardContent}
						type="title"
						color="inherit"
						align="center"
					>
						{idx(this.props.data, _ => _.name)}
					</Typography>
				</AppBar>
			</div>
		);
	}
}

export default withStyles(styles)(withRouter(League));
