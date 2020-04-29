import React, { Component } from 'react';
import PlayerSelect from './playerSelect';

class Boxscore extends Component {

    state = {
        roadRoster: null,
        homeRoster: null,
        roadPlayers: [],
        intervalIsSet: 0
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

    render() {
        const { roadTeamId, roadTeamName, homeTeamId, homeTeamName, location, date, status } = this.props.location.state;
        const { roadRoster, homeRoster } = this.state
        console.log(this.state)
        return (
            <div>
                <h3>{roadTeamName + " @ " + homeTeamName}</h3>
                <p>{location + " - " + date}</p>

                <b>{roadTeamName}</b>
                <table>
                    <tbody>
                        <tr>
                            <th>Player</th>
                            <th>AB</th>
                            <th>R</th>
                            <th>H</th>
                            <th>RBI</th>
                            <th>BB</th>
                            <th>K</th>
                        </tr>
                        <tr>
                            <td>
                              {roadRoster != null ?
                                <PlayerSelect roster={roadRoster.roster} />
                              :
                                <input type="text" placeholder="Player" />
                              }
                            </td>
                            <td><input type="number" /></td>
                            <td><input type="number" /></td>
                            <td><input type="number" /></td>
                            <td><input type="number" /></td>
                            <td><input type="number" /></td>
                            <td><input type="number" /></td>
                        </tr>
                    </tbody>
                </table>

                <b>{homeTeamName}</b> 
                <table>
                    <tbody>
                        <tr>
                            <th>Player</th>
                            <th>AB</th>
                            <th>R</th>
                            <th>H</th>
                            <th>RBI</th>
                            <th>BB</th>
                            <th>K</th>
                        </tr>
                        <tr>
                            <td>
                              {homeRoster != null ? 
                                <PlayerSelect roster={homeRoster.roster} />
                              :
                                <input type="text" placeholder="Player" />
                              }
                            </td>
                            <td><input type="number" /></td>
                            <td><input type="number" /></td>
                            <td><input type="number" /></td>
                            <td><input type="number" /></td>
                            <td><input type="number" /></td>
                            <td><input type="number" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Boxscore;