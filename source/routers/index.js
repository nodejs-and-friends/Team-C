"use strict";

const app = require("../config/application");
const userInterceptor = require("../midlleware/logged-user-data-interceptor");

app.use(userInterceptor);
app.get("/", (req, res) => res.redirect("/teams"));

require("./teams-router");
require("./identity-router");
require("./users-router");