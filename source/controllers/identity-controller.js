/**
 * Created by kidroca on 30.11.2016 г..
 */
"use strict";

const UserRepository = require("../data/UserRepository");
const passport = require("passport");

module.exports = {

    getLogin(req, res) {

        let messages = req.flash();
        res.render("auth/login", { messages });
    },

    postLogin: passport.authenticate("localLogin", {
        successRedirect: "/profile",
        successFlash: "Welcome!",
        failureRedirect: "/login",
        failureFlash: true
    }),

    getRegister(req, res) {

        let messages = req.flash();
        res.render("auth/register", { messages });
    },

    postRegister: passport.authenticate("localRegister", {
        successRedirect: "/profile",
        successFlash: "Registered successfully!",
        failureRedirect: "/register",
        failureFlash: true
    }),

    getProfile(req, res) {

        let messages = req.flash();
        res.status(200).send(`Welcome ${req.user.username}`);
    },

    getUnauthorized(req, res) {

        res.render("auth/unauthorized");
    }
};
