import React, {Component} from 'react'

class PlayerSelect extends Component {
    state = {
        playerList: []
    }

    componentDidMount() {
        this.populateSelect()
    }
    
    populateSelect = () => {
        const promises = this.props.roster.map((player) => {
            return fetch("http://localhost:3001/api/getPlayer/" + player)
              .then((data) => data.json())
              .then((res) => res.data)
        })
        
        Promise.all(promises).then(results => {
            const pArr = results.map((player) => player)
            this.setState({ playerList: pArr })
        })
    }

    render() {
        const { playerList } = this.state
        return (
            <select>
              {playerList.map((player) => (
                <option key={player._id}>{player.firstName + " " + player.lastName}</option>
              ))}
            </select>
        )
    }
}

export default PlayerSelect