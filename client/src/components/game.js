import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Game extends Component {
	render() {
		const { location, date, time, homeTeam, awayTeam, status, id } = this.props.game;
		return (
			<tr>
				<td>{date}</td>
				<td>{time}</td>
				<td>{awayTeam}</td>
				<td>{homeTeam}</td>
				<td>{status}</td>
				<td>{location}</td>
				<td><Link exact to={{
					pathname: '/game/' + id,
					state: this.props.game}}>Stats</Link>
					<Link to={{
					pathname: '/game/' + id + '/scorebook',
					state: this.props.game}}>Scorebook</Link></td>
			</tr>
		)
	}
}

export default Game;