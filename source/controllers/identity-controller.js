/**
 * Created by kidroca on 30.11.2016 г..
 */
"use strict";

const UserRepository = require("../data/UserRepository");
const passport = require("passport");

module.exports = {

    getLogin(req, res) {

        res.render("auth/login", { messages: req.flash("loginMessage") });
    },

    postLogin: passport.authenticate("localLogin", {
        successRedirect: "/profile",
        successFlash: "Welcome!",
        failureRedirect: "/login",
        failureFlash: true
    }),

    getRegister(req, res) {

        res.render("auth/register", { messages: req.flash("registerMessage") });
    },

    postRegister: passport.authenticate("localRegister", {
        successRedirect: "/profile",
        successFlash: "Registered successfully!",
        failureRedirect: "/register",
        failureFlash: true
    }),

    getProfile(req, res) {

        res.status(200).send(`Welcome ${req.user.username}`);
    },

    getUnauthorized(req, res) {

        res.render("auth/unauthorized");
    }
};
