/**
 * Created by kidroca on 4.12.2016 г..
 */
"use strict";

module.exports = (req, res, next) => {

    Object.assign(res.locals, {
        isLogged: Boolean(req.user),
        username: req.user && req.user.username
    });

    next();
};