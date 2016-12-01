/* globals require */

const express = require("express"),
	bodyParser = require('body-parser'),
 	methodOverride = require('method-override')

let app = express();

app.set("view engine", "pug");

app.use("/static", express.static("public"));

app.use(methodOverride('_method'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app;