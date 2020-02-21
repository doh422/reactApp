const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataSchema = new Schema(
	{
		id: Number,
		firstName: String,
		lastName: String,
		dateOfBirth: Date,
		number: Number,
		stats: Object
	}
);

module.exports = mongoose.model("Player", DataSchema);