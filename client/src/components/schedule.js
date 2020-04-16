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
		home: null,
		roadTeam: null,
		status: null,
		intervalIsSet: false,
		idToUpdate: null,
		objectToUpdate: null
	}

	componentDidMount() {
		this.getGamesFromDb();
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

	render() {
		const { games } = this.state;
		return (
			<div>
				<h3>Schedule component</h3>
				{games.length <= 0 ? 'No Games Scheduled' : 
				<table>
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
					<input type="text" placeholder="home team"
					  onChange={(e) => this.setState({ homeTeam: e.target.value })} />
					<input type="text" placeholder="roadteam"
					  onChange={(e) => this.setState({ roadTeam: e.target.value })} />
					<input type="text" placeholder="status"
					  onChange={(e) => this.setState({ status: e.target.value })} />
					<button onClick={(e) => this.submitGameForm(e)}>Add Game</button>
				</form>
			</div>
		)
	}
}

export default Schedule;