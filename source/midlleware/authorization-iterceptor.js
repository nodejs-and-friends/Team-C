/**
 * Created by kidroca on 2.12.2016 г..
 */
"use strict";

module.exports = function (req, res, next) {

    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.status(401).redirect("/unauthorized");
    }
};
