import React, {Component} from 'react';

class Players extends Component {
	render() {
		console.log(this);
		console.log(this.props);
		const { params } = this.props.match;
		return (
			<div>
				<h1>Players</h1>
				<p>{params.id}</p>
				
			</div>
		)
	}
}

export default Players;