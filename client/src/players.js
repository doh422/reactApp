import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';

const Player = ({ match }) => <p>{match.params.id}</p>;

class Players extends Component {
	render() {
		//const { url } = this.props.match;
		console.log(this.props.match);
		return (
			<div>
				<h1>Players</h1>
				<strong>Select Player</strong>
				<ul>
					<li>
						<Link to="/players/1">Player 1</Link>
					</li>
					<li>
						<Link to="/players/2">Player 2</Link>
					</li>
					<li>
						<Link to="/players/3">Player 3</Link>
					</li>
				</ul>
				<Route path="/players/:id" component={Player} />
			</div>
		)
	}
}

export default Players;