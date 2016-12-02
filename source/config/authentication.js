/**
 * Created by kidroca on 30.11.2016 г..
 */
"use strict";

const passport = require("passport");
const LocalStrategy = require("passport-local");
const UserRepository = require("../data/UserRepository");

const localLogin = new LocalStrategy((username, password, done) => {

    UserRepository.find({ username }).findOne()
                  .exec()
                  .then(user => {
                      console.log(user);
                      if (user && user.passwordMatches(password)) {
                          done(null, user);
                      }
                      else {
                          done(null, false, { message: "Invalid username or password" });
                      }
                  })
                  .catch(error => done(error, false, { message: error.message }));
});

const localRegister = new LocalStrategy({ passReqToCallback: true }, (req, username, password, done) => {

    UserRepository.find({ username }).findOne()
                  .exec()
                  .then(user => {

                      if (user) {
                          return done(null, false, { message: "Username is already taken" });
                      }

                      let newUser = {
                          username,
                          password,
                          email: req.body.email
                      };

                      return UserRepository
                          .add(newUser)
                          .then(result => done(null, result));
                  })
                  .catch(error => done(null, false, { message: error.message }));
});

passport.use("localLogin", localLogin);
passport.use("localRegister", localRegister);

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