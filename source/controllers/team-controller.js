"use strict";

const data = require("../data");
const TeamRepository = require("../data/TeamRepository");
const UserRepository = require("../data/UserRepository");
const flashErrors = require("../utils/flash-errors");

module.exports = {
    getAll(req, res) {
        data.getAllTeams()
            .then(teams => {
                if (req.user) {   
                    let userId = req.user.id;

                    teams.forEach(function(team) {
                        let areUsersEnough = false;
                        let isAlreadyApplied = false;
                        let isAlreadyInTheTeam = false;

                        if (team.owner == userId) {
                            team.isUpdateAllowed = true;
                            team.isDeleteAllowed = true;
                        }    
                        if (team.users.length >= team.maxUsers ){
                            areUsersEnough = true;
                        } 

                        if (!isAlreadyApplied) {
                            team.appliedUsers.forEach(function(appliedUser) {
                                if (appliedUser == userId) {
                                    isAlreadyApplied = true;
                                }
                            });
                        }

                        if (!isAlreadyInTheTeam) {
                            team.users.forEach(function(existUser) {
                                if (existUser == userId) {
                                    isAlreadyInTheTeam = true;
                                }
                            });
                        }

                        if (!areUsersEnough && !isAlreadyApplied && !isAlreadyInTheTeam) {
                            team.isJoinAllowed = true;
                        }
                    });
                }
                res.render("teams/teams-list", { result: teams });
            })
            .catch(error => {
                console.log(error);
                res.status(500).json(error);
            });
    },
    getById(req, res) {
        TeamRepository.get(req.params.id)
            .then(team => {

                if (team === null) {
                    return res.status(404)
                              .redirect("/error");
                }

                if (req.user && team.owner == req.user.id) {
                    team.isActionAllowed = true;
                }

                if (team.maxUsers > team.users.length) {
                    team.isAcceptButtonAllowed = true;
                }

                // if (team.users.length > 0)
                //     for (let i = 0; i < team.users.length; i++) {
                //         UserRepository.get(team.users[i])
                //             .then(member => {
                //                 team.users[i].username = member.username;
                //                 // console.log("username = " + member.username);

                //                 res.render("teams/team-details", { result: team });
                //             });
                //     }

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
        let teamData = { owner: req.user.id };
        Object.assign(teamData, req.body);

        TeamRepository.add(teamData)
                      .then(() => res.status(201).redirect("/teams"))
                      .catch(error => {
                          flashErrors(req.flash, error);

                          res.redirect("back");
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
        let userId = req.user.id;

        data.getTeamById(req.params.id)
            .then(team => {      
                let appliedUsers = team.appliedUsers;

                let userIndex = appliedUsers.indexOf(userId);

                if (userIndex == -1) {
                    appliedUsers.push(userId);
                }

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
        let teamId = req.params.id;
        let userId = req.params.userId;

        TeamRepository.get(teamId)
                      .then(teamDb => {
                            let users = teamDb.users;
                            let usersIndex = teamDb.users.indexOf(userId);

                            if (usersIndex == -1) {
                                users.push(userId);
                            }

                            data.updateTeamById(teamDb.id, { users })
                                .then(teamDb => {
                                    let index = teamDb.appliedUsers.indexOf(userId);

                                    if (index > -1) {
                                        teamDb.appliedUsers.splice(index, 1);
                                    }

                                    data.updateTeamById(teamDb.id, { appliedUsers: teamDb.appliedUsers })
                                        .then(
                                            teamDb => {
                                                res.status(200).redirect(`/teams/${teamDb.id}`);
                                            })
                                        .catch(error => {
                                            flashErrors(req.flash, error);
                                            res.redirect("back");
                                        });
                                    })
                                .catch(error => {
                                    flashErrors(req.flash, error);
                                    res.redirect("back");
                                });
                      })
                     .catch(error => {
                          flashErrors(req.flash, error);
                          res.redirect("back");
                      });
    },
    declineUserForTeam(req, res) {
        let teamId = req.params.id;
        let userId = req.params.userId;

        TeamRepository.get(teamId)
                      .then(teamDb => {
                            let index = teamDb.appliedUsers.indexOf(userId);

                            if (index > -1) {
                                teamDb.appliedUsers.splice(index, 1);
                            }

                            data.updateTeamById(teamDb.id, { appliedUsers: teamDb.appliedUsers })
                                .then(
                                    teamDb => {
                                        res.status(200).redirect(`/teams/${teamDb.id}`);
                                    })
                                .catch(error => {
                                    flashErrors(req.flash, error);
                                    res.redirect("back");
                                });
                      })
                      .catch(error => {
                          flashErrors(req.flash, error);
                          res.redirect("back");
                      });

        res.redirect("/teams/");
    },
    removeUserForTeam(req, res) {
        let teamId = req.params.id;
        let userId = req.params.userId;

        TeamRepository.get(teamId)
                      .then(teamDb => {
                            let index = teamDb.users.indexOf(userId);

                            if (index > -1) {
                                teamDb.users.splice(index, 1);
                            }

                            data.updateTeamById(teamDb.id, { users: teamDb.users })
                                .then(
                                    teamDb => {
                                        res.status(200).redirect(`/teams/${teamDb.id}`);
                                    })
                                .catch(error => {
                                    flashErrors(req.flash, error);
                                    res.redirect("back");
                                }); 
                      })
                      .catch(error => {
                          flashErrors(req.flash, error);
                          res.redirect("back");
                      });
    }
};