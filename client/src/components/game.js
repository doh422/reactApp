import React, {Component} from 'react';
import Link from 'react-router-dom';

class Game extends Component {
	render() {
		console.log(this.props);
		const { location, date, time, homeTeam, awayTeam, status, id } = this.props.game
		return (
			<tr>
				<td>{date}</td>
				<td>{time}</td>
				<td>{awayTeam}</td>
				<td>{homeTeam}</td>
				<td>{status}</td>
				<td>{location}</td>
				<td><Link to="/game/:id" Component={BoxScore} /></td>
			</tr>
		)
	}
}

export default Game;