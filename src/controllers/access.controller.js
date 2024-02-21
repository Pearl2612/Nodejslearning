"use strict";

const { OK, CREATED, SuccessResponse } = require("../core/success.response");
const AccessService = require("../services/access.service");

class AccessController {

    logout = async (req, res, next) => {
        new SuccessResponse({
            message: "Logout success",
            metadata: await AccessService.logout(req.keyStore),
        }).send(res);
    };

    login = async (req, res, next) => {
        new SuccessResponse({
            message: "Login OK!",
            metadata: await AccessService.login(req.body),
        }).send(res);
    };
    signUp = async (req, res, next) => {
        new CREATED({
            message: "Regiserted OK!",
            metadata: await AccessService.signUp(req.body),
            options: {
                limit: 10,
            },
        }).send(res);
    };
}

// 200 - OK
// 201 - Created

module.exports = new AccessController();
