import React, {Component} from 'react'
//import {Route, Link} from 'react-router-dom';

class Player extends Component {
	render() {
		const { id, firstName, lastName, number } = this.props.location.state
		return (
			<div>
				<h3>{firstName + " " + lastName + " - " + number}</h3>
			</div>
		)
	}
}

export default Player;