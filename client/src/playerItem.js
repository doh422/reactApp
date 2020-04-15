import React, { Component } from 'react';
import { Router, Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

class PlayerItem extends Component {
	render() {
		return (
			<li className="playerListItem">
				<Card>
					{this.props.player.image == null ? 
					<div className="defaultPlayerImgDiv">
						<svg className="bi bi-person-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						  <path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
						</svg>
					</div>
					:
					<Card.Img variant="top" src={this.props.player.image} />
					}
					<Card.Body>
						<Card.Title>{this.props.player.firstName + ' ' + this.props.player.lastName}</Card.Title>
						<Link to={'/players/' + this.props.player.id}>{this.props.player.firstName + ' ' + this.props.player.lastName + ' - ' + this.props.player.number}</Link>
						<button onClick={() => this.deletePlayerFromDb(this.props.player.id)}>Delete</button>
					</Card.Body>
				</Card>
			</li>
		)
	}	
}

export default PlayerItem;