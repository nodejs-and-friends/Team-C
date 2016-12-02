/* globals module require*/

const express = require("express");

module.exports = function(app, data, express) {
	let router = new express.Router();
	let controller = require("../controllers/home-controller")(data);

	router.get("/", controller.get);

	app.use("/", router); 
}