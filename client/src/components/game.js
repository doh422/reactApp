import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Game extends Component {
	render() {
		const { location, date, time, homeTeamName, roadTeamName, status, id } = this.props.game;
		const formattedDate = new Date(date)
		return (
			<tr>
				<td>{formattedDate.toLocaleDateString("en-US")}</td>
				<td>{time}</td>
				<td>{roadTeamName}</td>
				<td>{homeTeamName}</td>
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