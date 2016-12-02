"use strict";

const app = require("../config/application");
app.get("/", (req, res) => res.redirect("/teams"));

require("./teams-router");
require("./identity-router");