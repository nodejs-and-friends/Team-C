"use strict";

const data = require("../data");

module.exports = {
    getAll(req, res) {

        data.getAllTeams()
            .then(teams => {
                res.render("teams/teams-list", { result: teams });
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
                res.render("teams/team-details", { result: team });
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

                res.render("teams/team-update", { result: team });
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
        let maxUsers = Number(body.maxUsers);
        let users = body.users;

        data.createTeam(name, maxUsers, form, github, logo, users)
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
            maxUsers = Number(req.body.maxUsers);

        data.updateTeamById(id, {
            name: req.body.name,
            logo: req.body.logo,
            github: req.body.github,
            maxUsers
        })
            .then(
                teamDb => {
                    res.status(200).redirect("/teams/");
                })
            .catch(error => {
                console.log(error);
                res.status(500).json(error);
            });
    },
    remove(req, res) {
        data.removeTeamById(req.params.id)
            .then(teamDb => {
                res.status(200).redirect("/teams/");
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
                appliedUsers.push({ name: `other${appliedUsers.length}` });

                data.updateTeamById(team.id, { appliedUsers })
                    .then(
                        teamDb => {
                            res.status(200).redirect("/teams/");
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

                data.updateTeamById(teamDb.id, { users })
                    .then(
                        teamDb => {
                            res.status(200).redirect(`/teams/${teamDb.id}`);
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