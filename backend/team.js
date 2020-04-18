const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Player = require('./player').schema

const DataSchema = new Schema(
    {
        id: Number,
        name: String,
        description: String,
        roster: [{ type: Schema.Types.ObjectId, ref: 'Player' }]
    }
)

module.exports = mongoose.model("Team", DataSchema)