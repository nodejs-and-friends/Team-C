/* globals module require*/

const express = require("express");

module.exports = function(app, data, express) {
	let router = new express.Router();

	router.get("/", (req, res) => {
		data.getAllTeams()
			.then(teams => {
				res.render("teams-list", {
						result: teams
					});
			});
	})
	.get("/create", (req, res) => {
		res.render("team-create");
	})
	.get("/:id", (req, res) => {
		data.getTeamById(req.param.id)
			.then(team => {
				if (team === null) {
					return res.status(404)
						.redirect("/error");
				}

				res.render("team-details", {
						result: team
					});
			});
	})
	.post("/", (req, res) => {
		let body = req.body;
		data.createTeam(body.name, body.users)
			.then(() => {
				res.redirect("/teams");
			});
	});


	app.use("/teams", router); 
}