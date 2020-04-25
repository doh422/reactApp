const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Team = require('./team').schema;

const DataSchema = new Schema (
	{
		id: Number,
		date: Date,
		location: String,
		homeTeamId: { type: Schema.Types.ObjectId, ref: 'Team' },
		homeTeamName: String,
		roadTeamId: { type: Schema.Types.ObjectId, ref: 'Team' },
		roadTeamName: String,
		status: String,
		stats: Object
	}
);

module.exports = mongoose.model("Game", DataSchema);