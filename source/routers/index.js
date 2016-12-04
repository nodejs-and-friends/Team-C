"use strict";

const app = require("../config/application");
const userInterceptor = require("../midlleware/logged-user-data-interceptor");
const flashMessagesInterceptor = require("../midlleware/flash-message-interceptor");

app.use(userInterceptor);
app.use(flashMessagesInterceptor);
app.get("/", (req, res) => res.redirect("/teams"));

require("./teams-router");
require("./identity-router");
require("./users-router");