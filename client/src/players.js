import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import { Col, Container } from 'react-bootstrap';
import Player from './player';
import PlayerItem from './playerItem';

//const Player = ({ match }) => <p>{match.params.id}</p>;

class Players extends Component {

	// initialize state
  state = {
	data: [],
	id: 0,
	firstName: null,
	lastName: null,
	dateOfBirth: null,
	number: null,
	stats: {},
	image: null,
	intervalIsSet: false,
	idToDelete: null,
	idToUpdate: null,
	objectToUpdate: null
  }

	// when component mounts fetch existing data from db
  	// implement polling logic to see if db has changed
  componentDidMount() {
	this.getPlayerFromDb();
	if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getPlayerFromDb, 1000);
	  this.setState({ intervalIsSet: interval });
	}
  }

	// kill process when finished with it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // get method that uses backend api to fetch data from DB
  getPlayerFromDb = () => {
    fetch('http://localhost:3001/api/getPlayer')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  // put method that uses backend api to create new entry in DB
  putPlayerIntoDb = (state) => {
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }
    axios.post('http://localhost:3001/api/putPlayer', {
      id: idToBeAdded,
      firstName: state.firstName,
      lastName: state.lastName,
      dateOfBirth: state.dateOfBirth,
      number: state.number,
      stats: state.stats,
      image: state.image
    });
  };

  // delete method that uses backend api to remove entry from DB
  deletePlayerFromDb = (idToDelete) => {
    parseInt(idToDelete, 10); // radix val of 10
    let objectToDelete = null;
    this.state.data.forEach((dat) => {
      if (dat.id === idToDelete) {
        objectToDelete = dat._id;
      }
    });

    axios.delete('http://localhost:3001/api/deletePlayer', {
      data: {
        id: objectToDelete
      }
    });
  };

  // put method that uses backend api to edit existing DB entry
  updatePlayerinDb = (idToUpdate, updateToAppy) => {
    let objectToUpdate = null;
    parseInt(idToUpdate, 10);
    this.state.data.forEach((dat) => {
      if (dat.id === idToUpdate) {
        objectToUpdate = dat._id;
      }
    });

    axios.post('http://localhost:3001/api/updateData', {
      id: objectToUpdate,
      update: { message: updateToAppy }
    });
  };

  submitPlayerForm = (event) => {
  	event.preventDefault();
  	this.putPlayerIntoDb(this.state);
  }

  render() {
	const {data} = this.state;
	return (
		<Container>
			<h1>Players</h1>
			<strong>Select Player</strong>
			<ul>
				<li>
					<Link to="/players/1">Fake Player 1</Link>
				</li>
				<li>
					<Link to="/players/2">Fake Player 2</Link>
				</li>
				<li>
					<Link to="/players/3">Fake Player 3</Link>
				</li>
			</ul>

			<ul>
			{data.length <= 0 ? 'No players in DB' : data.map((dat) => (
				<PlayerItem key={dat.id} player={dat} /> ))}
			</ul>
			<Form>
				<Form.Row>
					<Form.Group as={Col} controlId="formFName">
						<Form.Label>First Name</Form.Label>
						<Form.Control type="text" placeholder="First Name" 
						  onChange={(e) => this.setState({ firstName: e.target.value })} />
					</Form.Group>
					<Form.Group as={Col} controlId="formLName">
						<Form.Label>Last Name</Form.Label>
						<Form.Control type="text" placeholder="Last Name" 
						  onChange={(e) => this.setState({ lastName: e.target.value })} />
					</Form.Group>
				</Form.Row>
				<Form.Row>
					<Form.Group as={Col} controlId="formDOB">
						<Form.Label>Date of Birth</Form.Label>
						<Form.Control type="date" 
						  onChange={(e) => this.setState({dateOfBirth: e.target.value})} />
					</Form.Group>
					<Form.Group as={Col} controlId="formNumber">
						<Form.Label>Uniform #</Form.Label>
						<Form.Control type="number" min="0" max="99"
						  onChange={(e) => this.setState({number: e.target.value})} />
					</Form.Group>
					<Form.Group as={Col} controlId="formImage">
						<Form.Label>Picture File</Form.Label>
						<Form.File label="Player picture file" custom
						  onChange={(e) => this.setState({image: e.target.value})} />
					</Form.Group>
				</Form.Row>
				<button onClick={(e) => this.submitPlayerForm(e)}>Add Player</button>
			</Form>
			<Route path="/players/:id" component={Player} />
		</Container>
	)
  }
}

export default Players;