import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Player from './player';

class PlayerItem extends Component {
	render() {
		const { image, firstName, lastName, number, id } = this.props.player;
		return (
			<li className="playerListItem">
				<Card>
					{image == null ? 
					<div className="defaultPlayerImgDiv">
						<svg className="bi bi-person-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						  <path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
						</svg>
					</div>
					:
					<Card.Img variant="top" src={image} />
					}
					<Card.Body>
						<Card.Title>{firstName + ' ' + lastName}</Card.Title>
						<Link to={{
							pathname: '/player/' + firstName + '-' + lastName,
							state: this.props.player}}>{firstName + ' ' + lastName + ' - ' + number}</Link>
						<button onClick={() => this.deletePlayerFromDb(id)}>Delete</button>
					</Card.Body>
				</Card>
			</li>
		)
	}	
}

export default PlayerItem;