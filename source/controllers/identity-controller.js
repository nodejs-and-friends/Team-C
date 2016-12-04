/**
 * Created by kidroca on 30.11.2016 г..
 */
"use strict";

const passport = require("passport");

module.exports = {

    getLogin(req, res) {

        res.render("auth/login");
    },

    postLogin: passport.authenticate("localLogin", {
        successRedirect: "/profile",
        successFlash: "Welcome!",
        failureRedirect: "/login",
        failureFlash: true
    }),

    getLogout: (req, res) => {
        req.logout();
        res.redirect("/");
    },

    getRegister(req, res) {

        res.render("auth/register");
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
