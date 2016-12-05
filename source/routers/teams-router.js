/* globals module require*/
"use strict";

const express = require("express");
const app = require("../config/application");
const controller = require("../controllers/team-controller");
const authorizedInterceptor = require("../midlleware/authorization-iterceptor");
const teamInterceptor = require("../midlleware/team-interceptor");
const teamOwnerIntercetor = require("../midlleware/team-owner-interceptor");

let router = new express.Router();

router.get("/", controller.getAll)
      .post("/accept/:teamId/:userId", authorizedInterceptor, teamInterceptor, teamOwnerIntercetor, controller.acceptUserForTeam)
      .post("/decline/:teamId/:userId", authorizedInterceptor, teamInterceptor, teamOwnerIntercetor, controller.declineUserForTeam)
      .post("/removeUser/:teamId/:userId", authorizedInterceptor, teamInterceptor, teamOwnerIntercetor, controller.removeUserForTeam)
      .get("/create", authorizedInterceptor, (req, res) => {
          res.render("teams/team-create");
      })
      .get("/:id", controller.getById)
      .post("/create", authorizedInterceptor, controller.create)
      .get("/update/:id", authorizedInterceptor, teamInterceptor, teamOwnerIntercetor, controller.getTeamForUpdateById)
      .post("/:id", authorizedInterceptor, teamInterceptor, teamOwnerIntercetor, controller.update)
      .get("/remove/:id", authorizedInterceptor, teamInterceptor, teamOwnerIntercetor, controller.remove)
      .post("/accept/", authorizedInterceptor, teamInterceptor, teamOwnerIntercetor, controller.acceptUserForTeam)
      .post("/join/:id", authorizedInterceptor, teamInterceptor, teamOwnerIntercetor, controller.addAppliedUser);

app.use("/teams", router);