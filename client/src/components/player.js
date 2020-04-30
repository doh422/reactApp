import React, {Component} from 'react'
//import {Route, Link} from 'react-router-dom';

class Player extends Component {

	state = {
		data: null
	}

	componentDidMount() {
		this.getStats(this.props.location.state._id)
	}

	getStats = (id) => {
		fetch("http://localhost:3001/api/getHitlineByPlayer/" + id)
			.then((data) => data.json())
			.then((res) => this.setState({ data: res.data }))
	}

	render() {
		const { id, firstName, lastName, number } = this.props.location.state
		const { data } = this.state
		console.log(this.state)
		return (
			<div>
				<h3>{firstName + " " + lastName + " - " + number}</h3>
				<b>Stats</b>
			  {data == null ? 'No stats yet'
				:
				<table>
					<tbody>
						<tr>
							<th>Date</th>
							<th>AB</th>
							<th>R</th>
							<th>H</th>
							<th>RBI</th>
							<th>BB</th>
							<th>K</th>
							<th>AVG</th>
							<th>OBP</th>
							<th>SLG</th>
						</tr>
					  {data.map((dat) => (
						<tr key={dat._id}>
							<th>{dat.date}</th>
							<th>{dat.atbats}</th>
							<th>{dat.runs}</th>
							<th>{dat.hits}</th>
							<th>{dat.rbi}</th>
							<th>{dat.bb}</th>
							<th>{dat.k}</th>
							<th>AVG</th>
							<th>OBP</th>
							<th>SLG</th>
						</tr>
						))}
					</tbody>
				</table>
			  }
			</div>
		)
	}
}

export default Player;