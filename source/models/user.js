/* globals require module */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const validator = require("../utils/validation");

let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: "Username is required",
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
    },

    password: {
        type: String,
        required: "Password is required",
        minlength: 4,
        maxlength: 64
    }
});

UserSchema.methods.hash = function (pass) {

    if (!pass || pass.length < 4 || pass.length > 64) {
        throw new Error("Invalid password data");
    }

    return bcrypt.hashSync(pass, bcrypt.genSaltSync(10), null);
};

UserSchema.methods.passwordMatches = function (pass) {

    return bcrypt.compareSync(pass, this.password);
};

UserSchema.pre("save", function (next) {

    if (!this.isModified("password")) {

        return next();
    }

    try {
        // hash the password only if modified
        this.password = this.hash(this.password);
        return next();
    }
    catch (error) {
        return next(error);
    }
});

let User = mongoose.model("User", UserSchema);
module.exports = User;