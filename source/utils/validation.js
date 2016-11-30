/**
 * Created by kidroca on 30.11.2016 г..
 */
"use strict";

module.exports = {
    validateEmail(email) {
        const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email);
    },

    isNotCuky(username) {
        const re = /cuki|cuky|cyki|цъки/gi;
        return re.test(username);
    }
};