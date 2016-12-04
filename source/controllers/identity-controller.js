/**
 * Created by kidroca on 30.11.2016 г..
 */
"use strict";

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

    getUnauthorized(req, res) {

        res.render("auth/unauthorized");
    }
};
