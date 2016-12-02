/* globals require */
"use strict";

const secrets = require("../../secrets");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const methodOverride = require("method-override");
const morgan = require("morgan");
const flash = require("connect-flash");

let app = express();

app.set("view engine", "pug");

app.use("/static", express.static("public"));

app.use(methodOverride("_method"));

app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: secrets.session }));
app.use(flash());

require("./authentication")(app);

module.exports = app;