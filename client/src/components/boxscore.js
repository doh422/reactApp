import React, { Component } from 'react';
import PlayerSelect from './playerSelect';
import axios from 'axios';

class Boxscore extends Component {

    state = {
        roadRoster: null,
        homeRoster: null,
        roadPlayers: [],
        intervalIsSet: 0,

        statsForPlayer: null,
        atbats: 0,
        hits: 0,
        runs: 0,
        rbi: 0,
        bb: 0,
        k: 0,
        sb: 0,
        doubles: 0,
        triple: 0,
        homers: 0,
        cs: 0,
        sac: 0,
        sf: 0,
    }

    componentDidMount() {
        this.getTeam(this.props.location.state.roadTeamId, "roadRoster");
        this.getTeam(this.props.location.state.homeTeamId, "homeRoster");
    }

    getTeam = (teamId, team) => {
        if (teamId != null) {
          fetch("http://localhost:3001/api/getTeam/" + teamId)
            .then((data) => data.json())
            .then((res) => this.setState({ [team]: res.data }))
        }
    }

    changeHandler = (event) => {
      let name = event.target.name
      let val = event.target.value
      this.setState({ [name]: val })
    }

    setPlayer = (event) => {
      if (event.target.value != null)
        this.setState({ statsForPlayer: event.target.value })
    }

    submitHandler = (event) => {
      event.preventDefault()
      axios.post("http://localhost:3001/api/putHitline", {
        player: this.state.statsForPlayer,
        game: this.props.location.state._id,
        date: this.props.location.state.date,
        atbats: this.state.atbats,
        hits: this.state.hits,
        runs: this.state.runs,
        rbi: this.state.rbi,
        bb: this.state.bb,
        k: this.state.k,
        sb: this.state.sb,
        doubles: this.state.doubles,
        triples: this.state.triples,
        homers: this.state.homers,
        cs: this.state.cs,
        sac: this.state.sac,
        sf: this.state.sf
      })
    }

    render() {
        const { roadTeamId, roadTeamName, homeTeamId, homeTeamName, location, date, status } = this.props.location.state;
        const { roadRoster, homeRoster } = this.state
        console.log(this.state)
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        const formattedDate = new Date(date)
        return (
            <div>
                <h3>{roadTeamName + " @ " + homeTeamName}</h3>
                <p>{location + " - " + formattedDate.toLocaleDateString("en-US", options)}</p>

                <b>{roadTeamName}</b>
                <table>
                    <tbody>
                        <tr>
                            <th></th>
                            <th>Player</th>
                            <th>AB</th>
                            <th>R</th>
                            <th>H</th>
                            <th>RBI</th>
                            <th>BB</th>
                            <th>K</th>
                            <th></th>
                        </tr>
                        <tr>
                            <td data-battingorder="1">1</td>
                            <td>
                              {roadRoster != null ?
                                <PlayerSelect roster={roadRoster.roster} action={this.setPlayer} />
                              :
                                <input type="text" placeholder="Player" />
                              }
                            </td>
                            <td><input type="number" name="atbats" onChange={this.changeHandler} /></td>
                            <td><input type="number" name="runs" onChange={this.changeHandler} /></td>
                            <td><input type="number" name="hits" onChange={this.changeHandler} /></td>
                            <td><input type="number" name="rbi" onChange={this.changeHandler} /></td>
                            <td><input type="number" name="bb" onChange={this.changeHandler} /></td>
                            <td><input type="number" name="k" onChange={this.changeHandler} /></td>
                            <td><button onClick={this.submitHandler}>ADD</button></td>
                        </tr>
                    </tbody>
                </table>

                <b>{homeTeamName}</b> 
                <table>
                    <tbody>
                        <tr>
                            <th></th>
                            <th>Player</th>
                            <th>AB</th>
                            <th>R</th>
                            <th>H</th>
                            <th>RBI</th>
                            <th>BB</th>
                            <th>K</th>
                            <th></th>
                        </tr>
                        <tr>
                          <td data-battingorder="1">1</td>
                            <td>
                              {homeRoster != null ? 
                                <PlayerSelect roster={homeRoster.roster} action={this.setPlayer} />
                              :
                                <input type="text" placeholder="Player" />
                              }
                            </td>
                            <td><input type="number" name="atbats" onChange={this.changeHandler} /></td>
                            <td><input type="number" name="runs" onChange={this.changeHandler} /></td>
                            <td><input type="number" name="hits" onChange={this.changeHandler} /></td>
                            <td><input type="number" name="rbi" onChange={this.changeHandler} /></td>
                            <td><input type="number" name="bb" onChange={this.changeHandler} /></td>
                            <td><input type="number" name="k" onChange={this.changeHandler} /></td>
                            <td><button onClick={this.submitHandler}>ADD</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Boxscore;