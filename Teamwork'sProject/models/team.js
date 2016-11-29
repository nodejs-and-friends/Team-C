/* globals require module */

const mongoose = require("mongoose");

let schema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	users: [{

	}]
});

mongoose.model("Team", schema);

module.exports = mongoose.model("Team");

