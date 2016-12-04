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
        validate: validators.isURL()
    },

    logo: {
        type: String,
        validate: validators.isURL()
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

mongoose.model("Team", TeamSchema);

module.exports = mongoose.model("Team");