/**
 * Created by kidroca on 4.12.2016 г..
 */
"use strict";

const express = require("express");
const app = require("../config/application");

const authInterceptor = require("../midlleware/authorization-iterceptor");
const UsersController = require("../controllers/users-controller");

let usersRouter = new express.Router();

usersRouter
    .get("/profile", authInterceptor, UsersController.getProfile);

app.use(usersRouter);
