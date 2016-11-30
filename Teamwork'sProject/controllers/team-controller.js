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
			// console.log(body);
			data.createTeam(body.name, body.users)
				.then(() => {
					res.redirect("/teams");
				});
		}
	};
};

            // const id = req.params.pasteId;

            // data.pasteById(id)
            //     .then(paste => res.status(200).json(paste))
            //     .catch(error => {
            //         console.log(error);
            //         res.status(500).json(error);
            //     });