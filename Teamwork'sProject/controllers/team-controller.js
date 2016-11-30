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
			// console.log(req.params.id);
			data.getTeamById(req.params.id)
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
			let body = req.body;

			let name = body.name;
			let form = body.form;
			let github = body.github;
			// console.log(body);
			data.createTeam(name, form, github, body.users)
				.then(() => {
					res.redirect("/teams");
				});
		}
	};
};