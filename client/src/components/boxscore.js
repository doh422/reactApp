import React, { Component } from 'react';

class Boxscore extends Component {
    render() {
        const { roadTeam, homeTeam, location, date, status } = this.props.location.state;
        return (
            <div>
                <h3>{roadTeam + " @ " + homeTeam}</h3>
                <p>{location + " - " + date}</p>
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
                            <td><input type="text" placeholder="Player" /></td>
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