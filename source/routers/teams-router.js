/* globals module require*/

const express = require("express");

module.exports = function(app, data, express) {
	let router = new express.Router();
	let controller = require("../controllers/team-controller")(data);

	router.get("/", controller.getAll)
		.get("/create", (req, res) => {
			res.render("team-create");
		})
		.get("/:id", controller.getById)
		.post("/", controller.create);

	app.use("/teams", router); 
}