/* globals require module */

const mongoose = require("mongoose");
const validator = require("../utils/validation");

let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: 20,
        minlength: 3,
        unique: true,
        validate: [validator.isNotCuky, "Sorry, this username is reserved"]
    },

    email: {
        type: String,
        required: "Email address is required",
        validate: [validator.validateEmail, "Please fill a valid email address"],
        unique: true
    }
});

let User = mongoose.model("User", UserSchema);
module.exports = User;
