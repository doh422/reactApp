import React, {Component} from 'react';
import Game from './game';
import axios from 'axios';

class Schedule extends Component {
	state = {
		games: [],
		id: 0,
		location: null,
		date: null,
		time: null,
		homeTeam: null,
		roadTeam: null,
		status: null,
		intervalIsSet: false,
		idToUpdate: null,
		objectToUpdate: null,
		teamData:[]
	}

	componentDidMount() {
		this.getGamesFromDb();
		this.getTeamsFromDb();
		if (!this.state.intervalIsSet) {
			let interval = setInterval(this.getGamesFromDb, 1000);
			this.setState({ intervalIsSet: interval});
		}
	}

	componentWillUnmount() {
		if (this.state.intervalIsSet) {
			clearInterval(this.state.intervalIsSet);
			this.setState({intervalIsSet: false});
		}
	}

	getGamesFromDb = () => {
		fetch('http://localhost:3001/api/getGames')
		  .then((data) => data.json())
		  .then((res) => this.setState({games: res.data}))
	}

	addGameToDb = () => {
		let currentIds = this.state.games.map((game) => game.id);
		let idToBeAdded = 0;
		while (currentIds.includes(idToBeAdded))
			++idToBeAdded
		axios.post('http://localhost:3001/api/putGame', {
			id: idToBeAdded,
			location: this.state.location,
			date: this.state.date,
			time: this.state.time,
			homeTeam: this.state.homeTeam,
			roadTeam: this.state.roadTeam,
			status: this.state.status,
			stats: null
		})
	}

	submitGameForm = (event) => {
		event.preventDefault();
		this.addGameToDb();
	}

	getTeamsFromDb = () => {
		fetch("http://localhost:3001/api/getTeams")
		  .then((data) => data.json())
		  .then((res) => this.setState({ teamData: res.data}))
	}

	setValueOrReplaceInput = (event, attr) => {
		if (event.target.value == "custom") {
		  event.target.style.display = "none"
		  event.target.nextSibling.style.display = "inline-block"
		} else {
		  console.log(attr)
		  this.setState({ [attr]: event.target.value })
		  console.log('2')
		}
	}

	render() {
		const { games, teamData } = this.state;
		console.log(this.state)
		return (
			<div>
				<h3>Schedule component</h3>
				{games.length <= 0 ? 'No Games Scheduled' : 
				<table style={tbStyle}>
					<tbody>
					<tr>
						<th>Date</th>
						<th>time</th>
						<th>Away</th>
						<th>Home</th>
						<th>Status</th>
						<th>Location</th>
						<th></th>
					</tr>
					{games.map((game) => (
					<Game game={game} key={game.id} /> ))}
					</tbody>
				</table>
				}
				<form>
					<input type="text" placeholder="location"
					  onChange={(e) => this.setState({ location: e.target.value })} />
					<input type="date" 
					  onChange={(e) => this.setState({ date: e.target.value})} />
					<input type="time" 
					  onChange={(e) => this.setState({ time: e.target.value })} />
					{teamData.length > 0 &&
					<select onChange={(e) => this.setValueOrReplaceInput(e, 'roadTeam')}>
						<option>Road Team</option>
						{teamData.map((team) => (
						<option key={team.id} value={team.id}>{team.name}</option>
						))}
						<option value="custom">Enter team manually</option>
					</select>
					}
					<input type="text" placeholder="roadteam" style={noDisplay}
					  onChange={(e) => this.setState({ roadTeam: e.target.value })} />
					@
					{teamData.length > 0 &&
					<select onChange={(e) => this.setValueOrReplaceInput(e, 'homeTeam')}>
						<option>Home Team</option>
						{teamData.map((team) => (
						<option key={team.id} value={team.id}>{team.name}</option>
						))}
						<option value="custom">Enter team manually</option>
					</select>
					}
					<input type="text" placeholder="home team" style={noDisplay}
					  onChange={(e) => this.setState({ homeTeam: e.target.value })} />
					<input type="text" placeholder="status"
					  onChange={(e) => this.setState({ status: e.target.value })} />
					<button onClick={(e) => this.submitGameForm(e)}>Add Game</button>
				</form>
			</div>
		)
	}
}

const tbStyle = {
	width: '100%'
}

const noDisplay = {
	display: 'none'
}

export default Schedule;