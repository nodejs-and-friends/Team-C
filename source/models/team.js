/* globals require module */

const mongoose = require("mongoose");

let schema = new mongoose.Schema({
	name: {
		type: String,
       	minlength: 5,
        required: true,
        unique: true
	},
	maxUsers: { 
		type: Number,
		required: true,
		min: 1, 
		max: 20 
	},
	form: {
		type: String,
		required: true,
		minlength: 5
	},
	github: {
		type: String
	},
	logo: {
		type: String
	},
	createdDate: {
		type: Date,	
		required: true
	},
	users: [{

	}],
	appliedUsers: [{
        // id: {
        //     type: String
        // },
        name: {
            username: String
        }
    }]
});

mongoose.model("Team", schema);

module.exports = mongoose.model("Team");