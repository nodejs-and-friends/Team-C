/**
 * Created by kidroca on 30.11.2016 г..
 */
"use strict";

const passport = require("passport");
const LocalStrategy = require("passport-local");
const UserRepository = require("../data/UserRepository");

const authStrategy = new LocalStrategy((username, password, done) => {

    UserRepository.find({ username, password }).findOne()
                  .exec()
                  .then(user => {
                      console.log(user);
                      if (user) {
                          done(null, user);
                      }
                      else {
                          done(null, false);
                      }
                  })
                  .catch(error => done(error, false));
});

passport.use(authStrategy);

passport.serializeUser((user, done) => done(null, user || false));

passport.deserializeUser((userId, done) => {

    UserRepository.get(userId)
                  .then(user => done(null, user || false))
                  .catch(error => done(error, false));
});

module.exports = function (app) {

    app.use(passport.initialize());
    app.use(passport.session());
};