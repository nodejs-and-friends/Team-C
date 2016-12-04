/**
 * Created by kidroca on 4.12.2016 г..
 */
"use strict";

const UserRepository = require("../data/UserRepository");
const TeamRepository = require("../data/TeamRepository");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = {

    getProfile(req, res) {

        const searchedId = new ObjectId(req.user.id);

        TeamRepository.find({ users: searchedId })
                      .then(teams => {
                          let result = Object.assign(req.user, { teams });

                          res.render("users/profile", result);
                      });
    }
};