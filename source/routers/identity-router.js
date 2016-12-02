/**
 * Created by kidroca on 2.12.2016 г..
 */
"use strict";

const express = require("express");
const passport = require("passport");
const app = require("../config/application");

const authInterceptor = require("../midlleware/authorization-iterceptor");
const IdentityCtrl = require("../controllers/identity-controller");

let router = new express.Router();

router
    .get("/login", IdentityCtrl.getLogin)

    .post(
        "/login", IdentityCtrl.postLogin)

    .get("/register", IdentityCtrl.getRegister)

    .post("/register", IdentityCtrl.postRegister)

    .get("/profile", authInterceptor, IdentityCtrl.getProfile)

    .get("/unauthorized", IdentityCtrl.getUnauthorized);

app.use(router);
