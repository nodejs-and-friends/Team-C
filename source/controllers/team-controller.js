module.exports = function (data) {
	return {
		getAll(req, res) {
			// toastr.info('Are you the 6 fingered man?')
			data.getAllTeams()
				.then(teams => {
					res.render("teams-list", {
							result: teams
						});
				});
		},
		getById(req, res) {
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
		getTeamForUpdateById(req, res) {
			data.getTeamById(req.params.id)
				.then(team => {
					if (team === null) {
						return res.status(404)
							.redirect("/error");
					}

					res.render("team-update", {
							result: team
						});
				});
		},
		create(req, res) {
			let body = req.body;

			let name = body.name;
			let form = body.form;
			let github = body.github;
			let logo = body.logo;

			data.createTeam(name, form, github, logo, body.users)
				.then(() => {
					// toastr.success("Team named: " + name + " was successfully registered!");
					res.redirect("/teams");
				});
		},
        update(req, res) {
            const id = req.params.id,
                newName = req.body.name,
                newlogo = req.body.logo;
             	github = req.body.github;

            data.updateTeamById(id, {
                name: req.body.name,
                logo: req.body.logo,
                github: req.body.github
            })
                .then(teamDb => {res.status(200).redirect("/teams/");
            	})
                .catch(error => {
                    console.log(error);
                    res.status(500).json(error);
                });
        },
		remove(req, res) {
			data.removeTeamById(req.params.id)
				.then(teamDb => {res.status(200).redirect("/teams/");
				})
				.catch(error => {
					console.log(error);
                    res.status(500).json(error);
            });
		}
	};
};