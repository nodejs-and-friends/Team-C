/* globals require module */

const mongoose = require("mongoose");
const validators = require("mongoose-validators");
const Schema = mongoose.Schema;

const userReference = {
    type: Schema.Types.ObjectId,
    ref: "User"
};

let TeamSchema = new Schema({
    owner: Object.assign({ required: true }, userReference),

    name: {
        type: String,
        minlength: 5,
        maxlength: 100,
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
        enum: ["onsite", "online"],
        required: true
    },

    github: {
        type: String,
        required: false,
        validate: validators.isURL({ skipEmpty: true })
    },

    logo: {
        type: String,
        required: false,
        validate: validators.isURL({ skipEmpty: true })
    },

    users: [userReference],

    appliedUsers: [userReference]

}, { timestamps: true });

TeamSchema.pre("save", function (next) {

    if (this.isModified("owner") && !this.users.includes(this.owner)) {

        this.users.push(this.owner);
    }

    next();
});

/**
 * @param {User | String} user - User object or objectId string
 * @returns {boolean}
 */
TeamSchema.methods.isTeamOwner = function (user) {

    const id = user.id || user;
    return id === this.owner;
};

mongoose.model("Team", TeamSchema);

module.exports = mongoose.model("Team");