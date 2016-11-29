module.exports = function (data) {
	return {
		getAll(req, res) {
			data.getAllTeams()
				.then(teams => {
					res.render("teams-list", {
							result: teams
						});
				});
		},
		getById(req, res) {
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
		},
		create(req, res) {
			console.log(req.body);
			let body = req.body;
			// console.log(body);
			data.createTeam(body.name, body.users)
				.then(() => {
					res.redirect("/teams");
				});
		}
	};
};