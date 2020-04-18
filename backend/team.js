const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Player = require('./player')

const DataSchema = new Schema(
    {
        id: Number,
        name: String,
        description: String,
        roster: [Player]
    }
)

module.exports = mongoose.model("Team". DataSchema)