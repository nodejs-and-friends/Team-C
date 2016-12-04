/* globals module require*/
"use strict";

const express = require("express");
const app = require("../config/application");
const controller = require("../controllers/team-controller");
const authorizedInterceptor = require("../midlleware/authorization-iterceptor");

// extract to middleware and add logic
const teamOwnerIntercetor = (res, req, next) => next();

let router = new express.Router();

router.get("/", controller.getAll)
      .post("/accept/:teamId/:userId", teamOwnerIntercetor, controller.acceptUserForTeam)
      .post("/decline/:teamId/:userId", teamOwnerIntercetor, controller.declineUserForTeam)
      .post("/removeUser/:teamId/:userId", teamOwnerIntercetor, controller.removeUserForTeam)
      .get("/create", authorizedInterceptor, (req, res) => {
          res.render("teams/team-create");
      })
      .get("/:id", controller.getById)
      .post("/create", authorizedInterceptor, controller.create)
      .get("/update/:id", teamOwnerIntercetor, controller.getTeamForUpdateById)
      .post("/:id", teamOwnerIntercetor, controller.update)
      .get("/remove/:id", teamOwnerIntercetor, controller.remove)
      .post("/accept/", teamOwnerIntercetor, controller.acceptUserForTeam)
      .post("/join/:id", teamOwnerIntercetor, controller.addAppliedUser);

app.use("/teams", router);