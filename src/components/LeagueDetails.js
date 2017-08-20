/**
 * Copyright 2017-present FireAnt. All Rights Reserved.
 *
 * @providesModule LeagueDetails
 * @flow
 * @format
*/

import React, { Component } from 'react';
import idx from 'idx';
import axios from 'axios';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import Table, {
	TableBody,
	TableCell,
	TableHead,
	TableRow
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';
import Toolbar from 'material-ui/Toolbar';

type State = {
	details: Object,
	data: Object
};

type Props = {
	location: any,
	match: any,
	history: Object
};

const styles = {
	appHeader: {
		padding: '20px'
	},
	appHeaderText: {
		padding: '20px',
		flex: 1
	},
	paper: {
		width: '100%',
		overflowX: 'auto'
	}
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
			<div style={styles.appHeader}>
				<AppBar position="static" color="primary">
					<Toolbar>
						<IconButton
							aria-label="ArrowBack"
							onClick={() => this.props.history.push('/')}
						>
							<ArrowBackIcon color="white" />
						</IconButton>
						<Typography
							style={styles.appHeaderText}
							type="title"
							color="inherit"
							align="center"
						>
							{name}
						</Typography>
					</Toolbar>
				</AppBar>
				<Paper style={styles.paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell numeric>Position</TableCell>
								<TableCell>Team</TableCell>
								<TableCell numeric>Played</TableCell>
								<TableCell numeric>Wins</TableCell>
								<TableCell numeric>Draws</TableCell>
								<TableCell numeric>Lost</TableCell>
								<TableCell numeric>Points</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{this.state.data.length > 0 &&
								this.state.data.map(n => {
									return (
										<TableRow key={n.identifier}>
											<TableCell numeric>
												{n.position}
											</TableCell>
											<TableCell>
												{n.team}
											</TableCell>
											<TableCell numeric>
												{n.overall.wins}
											</TableCell>
											<TableCell numeric>
												{n.overall.draws}
											</TableCell>
											<TableCell numeric>
												{n.overall.losts}
											</TableCell>
											<TableCell numeric>
												{n.overall.matches_played}
											</TableCell>
											<TableCell numeric>
												{n.overall.points}
											</TableCell>
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</Paper>
			</div>
		);
	}
}

export default withStyles(styles)(withRouter(LeagueDetails));
