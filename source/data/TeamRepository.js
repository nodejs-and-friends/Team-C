/**
 * Created by kidroca on 4.12.2016 г..
 */
"use strict";

const Team = require("../models/team");
const Repository = require("./Repository");

const TeamRepository = new Repository(Team);

module.exports = TeamRepository;
