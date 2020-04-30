const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Player = require('./player').schema
const Game = require('./game').schema

const DataSchema = new Schema (
    {
        date: Date,
        player: { type: Schema.Types.ObjectId, ref: 'Player' },
        game: { type: Schema.Types.ObjectId, ref: 'Game' },
        atbats: Number,
        hits: Number,
        runs: Number,
        rbi: Number,
        bb: Number,
        k: Number,
        sb: Number,
        cs: Number,
        doubles: Number,
        triples: Number,
        homers: Number,
        sac: Number,
        sf: Number
    }
)

module.exports = mongoose.model("Hitline", DataSchema)