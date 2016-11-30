/* globals require module */

const mongoose = require("mongoose");

let schema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	}
});

mongoose.model("User", schema);

module.exports = mongoose.model("User");

