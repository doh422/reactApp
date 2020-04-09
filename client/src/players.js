import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';

const Player = ({ match }) => <p>{match.params.id}</p>;

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
    console.log(state);
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
    parseInt(idToDelete);
    let objectToDelete = null;
    this.state.data.forEach((dat) => {
      if (dat.id == idToDelete) {
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
    parseInt(idToUpdate);
    this.state.data.forEach((dat) => {
      if (dat.id == idToUpdate) {
        objectToUpdate = dat._id;
      }
    });

    axios.post('http://localhost:3001/api/updateData', {
      id: objectToUpdate,
      update: { message: updateToAppy }
    });
  };

  render() {
	//console.log(this.props.match);
	const {data} = this.state;
	console.log(this.state);
	return (
		<div>
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
				<li key={dat.id}>
					<Link to={'/players/' + dat.id}>{dat.firstName + ' ' + dat.lastName + ' - ' + dat.number}</Link>
					<button onClick={() => this.deletePlayerFromDb(dat.id)}>Delete</button>
				</li>
				))}
			</ul>
			<div>
			  <input type="text" name="firstName" 
			  	onChange={(e) => this.setState({ firstName: e.target.value })} 
			  	placeholder="First Name" />
			  <input type="text" name="lastName"
			    onChange={(e) => this.setState({ lastName: e.target.value })}
			    placeholder="Last Name" />
			  <input type="text" name="dateOfBirth"
			    onChange={(e) => this.setState({ dateOfBirth: e.target.value })}
			    placeholder="DOB" />
			  <input type="text" name="number"
			    onChange={(e) => this.setState({ number: e.target.value })}
			    placeholder="Uniform Number" />
			  <input type="text" name="image" 
			    onChange={(e) => this.setState({ image: e.target.value })}
			    placeholder ="image" />
			  <button onClick={() => this.putPlayerIntoDb(this.state)}>Add Player</button>
			</div>
			<Route path="/players/:id" component={Player} />
		</div>
	)
  }
}

export default Players;