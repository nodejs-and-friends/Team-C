/* globals require module */

const mongoose = require("mongoose");

let schema = new mongoose.Schema({
	name: {
		type: String,
       	minlength: 5,
        required: true,
        unique: true
	},
	form: {
		type: String,
		required: true
	},
	github: {
		type: String,
	},
	logo: {
		type: String,
	},
	users: [{

	}]
});

mongoose.model("Team", schema);

module.exports = mongoose.model("Team");

