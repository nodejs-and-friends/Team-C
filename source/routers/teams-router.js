/* globals module require*/
"use strict";

const express = require("express");
const app = require("../config/application");
const controller = require("../controllers/team-controller");
const authorizedInterceptor = require("../midlleware/authorization-iterceptor");
const teamInterceptor = require("../midlleware/team-interceptor");
const teamOwnerInterceptor = require("../midlleware/team-owner-interceptor");

const teamOwnerInterceptors = [authorizedInterceptor, teamInterceptor, teamOwnerInterceptor];

let teamsRouter = new express.Router();

teamsRouter
    .get("/", controller.getAll)
    .get("/create", authorizedInterceptor, (req, res) => res.render("teams/team-create"))
    .post("/create", authorizedInterceptor, controller.create)
    .post("/join/:id", authorizedInterceptor, teamInterceptor, controller.addAppliedUser)
    .get("/:id", controller.getById)

    .post("/accept/:id/:userId", teamOwnerInterceptors, controller.acceptUserForTeam)
    .post("/decline/:id/:userId", teamOwnerInterceptors, controller.declineUserForTeam)
    .post("/removeUser/:id/:userId", teamOwnerInterceptors, controller.removeUserForTeam)
    .get("/update/:id", teamOwnerInterceptors, controller.getTeamForUpdateById)
    .post("/:id", teamOwnerInterceptors, controller.update)
    .get("/remove/:id", teamOwnerInterceptors, controller.remove);

app.use("/teams", teamsRouter);
