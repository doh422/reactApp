const mongoose = require('mongoose')
const Schema = mongoose.Schema


const DataSchema = new Schema (
    {
        data: Date,
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

module.exports = mongoose.model("hitline", DataSchema)