import React, {Component} from 'react';
import AtBat from './atBat';

class Scorebook extends Component {
    render() {
        console.log(this.props);
        return (
            <table style={sbTable}>
                <tbody>
                    <tr>
                        <th>Player</th>
                        <th>Pos</th>
                        <th>#</th>
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                        <th>4</th>
                        <th>5</th>
                        <th>6</th>
                        <th>7</th>
                        <th>8</th>
                        <th>9</th>
                    </tr>
                    <tr>
                        <td>hello</td>
                        <td></td>
                        <td></td>
                        <td><div style={sbDiamond}><AtBat /></div></td>
                        <td><div style={sbDiamond}></div></td>
                        <td><div style={sbDiamond}></div></td>
                        <td><div style={sbDiamond}></div></td>
                        <td><div style={sbDiamond}></div></td>
                        <td><div style={sbDiamond}></div></td>
                        <td><div style={sbDiamond}></div></td>
                        <td><div style={sbDiamond}></div></td>
                        <td><div style={sbDiamond}></div></td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

const sbTable = {
    width: '100%',
    borderCollapse: 'collapse'
}

const sbDiamond = {
    height: '50px',
	width: '50px',
	border: '2px solid',
	transform: 'rotate(45deg)'
}

export default Scorebook;