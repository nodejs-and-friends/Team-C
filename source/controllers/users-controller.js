/**
 * Created by kidroca on 4.12.2016 г..
 */
"use strict";

const UserRepository = require("../data/UserRepository");

module.exports = {

    getProfile(req, res) {

        let messages = req.flash();
        res.render("users/profile");
    }

};