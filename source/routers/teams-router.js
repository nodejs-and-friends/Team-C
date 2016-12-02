/* globals module require*/
"use strict";

const express = require("express");
const app = require("../config/application");
const controller = require("../controllers/team-controller");

let router = new express.Router();

router.get("/", controller.getAll)
      .post("/accept/:teamId/:userId", controller.acceptUserForTeam)
      .post("/decline/:teamId/:userId", controller.declineUserForTeam)
      .post("/removeUser/:teamId/:userId", controller.removeUserForTeam)
      .get("/create", (req, res) => {
          res.render("team-create");
      })
      .get("/:id", controller.getById)
      .post("/", controller.create)
      .get("/update/:id", controller.getTeamForUpdateById)
      .post("/:id", controller.update)
      .get("/remove/:id", controller.remove)
      .post("/accept/", controller.acceptUserForTeam)
      .post("/join/:id", controller.addAppliedUser);

app.use("/teams", router);