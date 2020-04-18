import React, {Component} from 'react';

class AtBat extends Component {
    render() {
        return (
            <form>
                <select>
                    <option>1B</option>
                    <option>2B</option>
                    <option>3B</option>
                    <option>HR</option>
                    <option>K</option>
                    <option>BB</option>
                    <option>HBP</option>
                    <option>GO</option>
                    <option>GIDP</option>
                    <option>SF</option>
                    <option>FO</option>
                    <option>FC</option>
                </select>
            </form>
        )
    }
}

export default AtBat;