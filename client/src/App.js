import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  // initialize state
  state = {
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null
  };

  // when component mounts fetch existing data from db
  // implement polling logic to see if db has changed
  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
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
  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  // put method that uses backend api to create new entry in DB
  putDataToDb = (message) => {
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post('http://localhost:3001/api/putData', {
      id: idToBeAdded,
      message: message
    });
  };

  // delete method that uses backend api to remove entry from DB
  deleteFromDB = (idToDelete) => {
    parseInt(idToDelete);
    let objectToDelete = null;
    this.state.data.forEach((dat) => {
      if (dat.id == idToDelete) {
        objectToDelete = dat._id;
      }
    });

    axios.delete('http://localhost:3001/api/deleteData', {
      data: {
        id: objectToDelete
      }
    });
  };

  // put method that uses backend api to edit existing DB entry
  updateDB = (idToUpdate, updateToAppy) => {
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

  // UI
  render() {
    const {data} = this.state;
    return (
      <div>
        <ul>
          {data.length <= 0 
           ? 'NO DB ENTRIES YET' 
           : data.map((dat) => (
              <li style={{padding: '10px' }} key={dat.id}>
                <span style={{color: 'gray'}}> id: </span> {dat.id} <br />
                <span style={{color: 'gray'}}> data: </span>
                {dat.message}
              </li>
            ))} 
        </ul>
        <div style={{padding: '10px'}}>
          <input type="text"
            onChange={(e) => this.setState({ message: e.target.value })}
            placeholder="add something to the database"
            style={{width: '200px'}} />
          <button onClick={() => this.putDataToDb(this.state.message)}>ADD</button>
        </div>
        <div style={{padding: '10px'}}>
          <input type="text"
            style={{width: '200px'}}
            onChange={(e) => this.setState({ idToDelete: e.target.value })}
            placeholder="put id of item to delete here" />
          <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>DELETE</button>
        </div>
        <div style={{padding: '10px'}}>
          <input type="text"
            style={{width: '200px'}}
            onChange={(e) => this.setState({ idToUpdate: e.target.value })}
            placeholder="id of item to update here" />
          <input type="text"
            style={{width: '200px'}}
            onChange={(e) => this.setState({ updateToAppy: e.target.value })}
            placeholder="put new value of item here" />
          <button onClick={() => this.updateDB(this.state.idToUpdate, this.state.updateToAppy)}>UPDATE</button>
        </div>
      </div>
    );
  }
}

export default App;
