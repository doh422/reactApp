const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataSchema = new Schema (
	{
		id: Number,
		date: Date,
		location: String,
		homeTeam: String,
		roadTeam: String,
		status: String,
		stats: Object
	}
);

module.exports = mongoose.model("Game", DataSchema);