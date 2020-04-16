import React, {Component} from 'react';

class Scorebook extends Component {
    render() {
        console.log(this.props);
        return (
            <table>
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
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

export default Scorebook;