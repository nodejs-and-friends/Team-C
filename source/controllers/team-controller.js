module.exports = function (data) {
	return {
		getAll(req, res) {
			
			data.getAllTeams()
				.then(teams => {
					res.render("teams-list", {
							result: teams
						});
				})
				.catch(error => {
					console.log(error);
                    res.status(500).json(error);
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
				})
				.catch(error => {
					console.log(error);
                    res.status(500).json(error);
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
				})
				.catch(error => {
					console.log(error);
                    res.status(500).json(error);
                });
		},
		create(req, res) {
			let body = req.body;
			let name = body.name;
			let form = body.form;
			let github = body.github;
			let logo = body.logo;
			let maxUsers = +body.maxUsers;
			// let users = body.users;

			data.createTeam(name, maxUsers, form, github, logo)
				.then(() => {
					// toastr.success("Team named: " + name + " was successfully registered!");
					res.redirect("/teams");
				})
				.catch(error => {
                    console.log(error);
                    res.status(500).json(error);
                });
		},
        update(req, res) {
            const id = req.params.id,
             	maxUsers = +req.body.maxUsers;

            data.updateTeamById(id, {
                name: req.body.name,
                logo: req.body.logo,
                github: req.body.github,
                maxUsers: maxUsers
            })
                .then(
                	teamDb => {res.status(200).redirect("/teams/");
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
		},
		addAppliedUser(req, res) {
			data.getTeamById(req.params.id)
				.then(team => {
					let appliedUsers = team.appliedUsers;
					appliedUsers.push({
						name: "other" + appliedUsers.length
					});

					data.updateTeamById(team.id, {
						appliedUsers: appliedUsers
		            })
                    .then(
                		teamDb => {res.status(200).redirect("/teams/");
            		})
					.catch(error => {
						console.log(error);
	                    res.status(500).json(error);
	                });
				})
				.catch(error => {
					console.log(error);
                    res.status(500).json(error);
                });
		},
		acceptUserForTeam(req, res) {
			let teamId = req.params.teamId;
			let userId = req.params.userId;

			data.getTeamById(teamId)
				.then(teamDb => {
					let users = teamDb.users;
					users.push(userId);

					data.updateTeamById(teamDb.id, {
						users: users
		            })
		            .then(		            	
                		teamDb => {
                			res.status(200).redirect("/teams/");
                			// TODO remove user from appliedUsers
            		})
			        .catch(error => {
						console.log(error);
	                    res.status(500).json(error);
	                });
				})
				.catch(error => {
					console.log("test");
					console.log(error);
	                res.status(500).json(error);
	            });
		},
		declineUserForTeam(req, res) {
			// TODO remove from appliedUsers
			res.redirect("/teams/");
		},
		removeUserForTeam(req, res) {
			// TODO remove from appliedUsers
			res.redirect("/teams/");
		}
	};
};