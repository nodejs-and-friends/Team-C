/**
 * Created by kidroca on 2.12.2016 г..
 */
"use strict";

const User = require("../models/user");
const Repository = require("./Repository");

const UserRepository = new Repository(User);

module.exports = UserRepository;
